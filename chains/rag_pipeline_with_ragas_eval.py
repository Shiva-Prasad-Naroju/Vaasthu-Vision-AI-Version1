# rag_pipeline.py

# Use this rag_pipeline when we use the qdrant cloud instead of pulling qdrant image from docker and 
# this pipeline is along with RAGAS evaluation code compatibility to evaluate the performance. ✅

import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_qdrant import QdrantVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from qdrant_client import QdrantClient
from langchain_groq import ChatGroq
from langchain.chains import LLMChain

# Load environment variables
load_dotenv()
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

# Connect to qdrant cloud
client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

# Initialize embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Initialize vectorstore
vectorstore = QdrantVectorStore(
    client=client,
    collection_name="vaasthu_rules",
    embedding=embeddings,
)

# Prompt template for RAG (Vaasthu-specific)
template = """
You are VaasthuGPT™, an expert in Vaasthu Shastra. 
Answer the user's home-related question clearly and briefly — in 2 to 4 lines. 
Do not include background explanation, emotional tone, remedies, or follow-up prompts. 
Just give the direct Vaasthu answer to the question.

---

📌 CLIENT QUESTION:
{question}

📖 CONTEXT:
{context}

---

🪔 FINAL ANSWER:
Give a short and clear Vaasthu-based recommendation in 2 to 4 lines only.
"""

PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template=template,
)

# Groq LLM (for both RAG and fallback)
llm = ChatGroq(
    model_name="llama3-8b-8192",
    temperature=0.5,
    model_kwargs={"top_p": 0.85},
    max_tokens=1024,
    api_key=os.getenv("GROQ_API_KEY")
)

# Build RetrievalQA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3}),
    chain_type="stuff",
    chain_type_kwargs={"prompt": PROMPT},
    return_source_documents=True,
)

# Fallback prompt for irrelevant input
fallback_prompt = PromptTemplate.from_template("""
You are a friendly assistant. Reply naturally to casual or random messages like greetings, small talk, or gibberish.

Do NOT answer any Vaasthu or architecture related question. Just say: "Sorry, I can answer Vaasthu-related questions."

User: {query}
AI:""")

fallback_chain = LLMChain(llm=llm, prompt=fallback_prompt)

# 🔐 Critical Vaasthu keywords to force RAG routing
CRITICAL_KEYWORDS = [
    "bedroom", "master bedroom", "children bedroom", "guest bedroom",
    "kitchen", "living room", "dining room", "study room", "pooja room", "store room",
    "bathroom", "toilet", "septic tank", "water tank", "borewell",
    "stairs", "staircase", "balcony", "veranda", "terrace",
    "entrance", "main door", "entry", "exit",
    "placement", "located", "positioned", "direction", "facing",
    "north", "south", "east", "west", 
    "northeast", "northwest", "southeast", "southwest", "center", "brahmasthan"
]

# 📊 Confidence thresholds
# HIGH_CONFIDENCE = 0.78
# LOW_CONFIDENCE = 0.60

# ✅ Final routing function (compatible with Ragas)
def _documents_to_texts(docs):
    """Helper: convert LangChain Document objects to plain page_content strings."""
    texts = []
    for d in docs:
        content = getattr(d, "page_content", None) or getattr(d, "content", None) or str(d)
        texts.append(content)
    return texts


def route_query(query: str) -> dict:
    """
    Return a dict compatible with Ragas:
      {
        "question": "...",
        "answer": "...",
        "contexts": ["doc1 text", "doc2 text", ...]
      }

    Uses Qdrant distance scores (lower = better).
    """
    query = (query or "").strip()
    query_lower = query.lower()

    # Fast path override (keywords always go to QA chain)
    if any(kw in query_lower for kw in CRITICAL_KEYWORDS):
        try:
            result = qa_chain.invoke({"query": query})
        except Exception as e:
            return {"question": query, "answer": f"Error: {e}", "contexts": []}

        contexts = []
        if isinstance(result, dict):
            src_docs = result.get("source_documents", [])
            contexts = _documents_to_texts(src_docs)
            answer = result.get("result") or result.get("answer") or ""
        else:
            answer = str(result)

        return {"question": query, "answer": answer.strip(), "contexts": contexts or []}

    # Retrieve docs with similarity scores
    docs_and_scores = vectorstore.similarity_search_with_score(query, k=3)

    if not docs_and_scores:
        return {
            "question": query,
            "answer": "❌ Sorry, I have no idea about the query you asked.",
            "contexts": [],
        }

    docs = [item[0] for item in docs_and_scores]
    scores = [item[1] for item in docs_and_scores]
    contexts = _documents_to_texts(docs)

    # Take top doc score (lower = better similarity in Qdrant)
    top_doc, top_score = docs_and_scores[0]

    # Thresholds (tune based on testing)
    HIGH_CONFIDENCE = 0.25   # very close match
    LOW_CONFIDENCE = 0.55    # somewhat related, but risky

    if top_score <= HIGH_CONFIDENCE:
        # Confident: run QA chain
        try:
            result = qa_chain.invoke({"query": query})
        except Exception as e:
            return {"question": query, "answer": f"Error: {e}", "contexts": contexts}

        if isinstance(result, dict):
            answer = result.get("result") or result.get("answer") or ""
            src_docs = result.get("source_documents", [])
            src_texts = _documents_to_texts(src_docs)
            final_contexts = src_texts or contexts
        else:
            answer = str(result)
            final_contexts = contexts

        return {"question": query, "answer": answer.strip(), "contexts": final_contexts}

    elif top_score <= LOW_CONFIDENCE:
        # Somewhat related, but unsure → "don't know"
        return {
            "question": query,
            "answer": "❌ Sorry, I’m not confident enough to answer this question.",
            "contexts": contexts,
        }

    else:
        # Too far → fallback chain (chitchat, smalltalk)
        fallback = fallback_chain.invoke({"query": query})
        if isinstance(fallback, dict):
            fallback_text = fallback.get("text") or fallback.get("result") or ""
        else:
            fallback_text = str(fallback)

        return {"question": query, "answer": fallback_text.strip(), "contexts": []}

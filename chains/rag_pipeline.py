
# Use this rag_pipeline when we use the qdrant cloud ✅ 
# instead of pulling qdrant image from docker ❌

# This file is working fine but getting is issue while deploying in render.

import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_qdrant import QdrantVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from qdrant_client import QdrantClient
from langchain_groq import ChatGroq
from langchain.schema.runnable import Runnable
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
HIGH_CONFIDENCE = 0.78
LOW_CONFIDENCE = 0.60

# ✅ Final routing function
def route_query(query: str) -> dict:
    query_lower = query.lower()

    # Keyword override check
    if any(kw in query_lower for kw in CRITICAL_KEYWORDS):
        result = qa_chain.invoke({"query": query})
        return {
            "query": query.strip(),
            "response": result["result"].strip()
        }

    # Run similarity search manually to get score
    docs_and_scores = vectorstore.similarity_search_with_score(query, k=1)

    if not docs_and_scores:
        # No match found at all
        return {
            "query": query.strip(),
            "response": "Sorry, I have no idea about the query you asked."
        }

    top_doc, top_score = docs_and_scores[0]

    if top_score >= HIGH_CONFIDENCE:
        result = qa_chain.invoke({"query": query})
        return {
            "query": query.strip(),
            "response": result["result"].strip()
        }
    elif top_score >= LOW_CONFIDENCE:
        return {
            "query": query.strip(),
            "response": "❌Sorry, I have no idea about the query you asked."
        }
    else:
        # Handle irrelevant/casual input
        fallback = fallback_chain.invoke({"query": query})
        return {
            "query": query.strip(),
            "response": fallback["text"].strip()
        }

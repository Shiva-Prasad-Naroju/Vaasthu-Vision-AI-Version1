# chains/rag_pipeline.py
# Render-friendly, lazy-loading RAG pipeline for Vaasthu Vision AI

import os
from typing import Tuple, Optional, Dict, Any
from functools import lru_cache

from langchain.prompts import PromptTemplate
from langchain.schema.runnable import Runnable
from langchain.chains import RetrievalQA, LLMChain

# -------------------------
# ⚙️ Config & constants
# -------------------------

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

# Prompt template for RAG (Vaasthu-specific)
_TEMPLATE = """
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
    template=_TEMPLATE,
)

# Fallback prompt for irrelevant input
_FALLBACK_PROMPT = PromptTemplate.from_template("""
You are a friendly assistant. Reply naturally to casual or random messages like greetings, small talk, or gibberish.

Do NOT answer any Vaasthu or architecture related question. Just say: "Sorry, I can answer Vaasthu-related questions."

User: {query}
AI:
""")


# -------------------------
# 🧠 Lazy loaders (cached)
# -------------------------

@lru_cache(maxsize=1)
def _get_embeddings():
    # Import inside to avoid loading heavy deps at module import time
    from langchain_huggingface import HuggingFaceEmbeddings
    # all-MiniLM-L6-v2 is compact and suitable for free tier memory
    return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


@lru_cache(maxsize=1)
def _get_qdrant_client():
    from qdrant_client import QdrantClient
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_key = os.getenv("QDRANT_API_KEY")
    if not qdrant_url or not qdrant_key:
        raise RuntimeError("QDRANT_URL or QDRANT_API_KEY is not set in environment.")
    return QdrantClient(url=qdrant_url, api_key=qdrant_key)


@lru_cache(maxsize=1)
def _get_vectorstore():
    from langchain_qdrant import QdrantVectorStore
    client = _get_qdrant_client()
    embeddings = _get_embeddings()
    # Keep k small in retriever calls to conserve memory/CPU
    return QdrantVectorStore(
        client=client,
        collection_name="vaasthu_rules",
        embedding=embeddings,
    )


@lru_cache(maxsize=1)
def _get_llm():
    from langchain_groq import ChatGroq
    groq_key = os.getenv("GROQ_API_KEY")
    if not groq_key:
        raise RuntimeError("GROQ_API_KEY is not set in environment.")
    # Do NOT write back to os.environ; just read it.
    return ChatGroq(
        model_name="llama3-8b-8192",
        temperature=0.5,
        model_kwargs={"top_p": 0.85},
        max_tokens=1024,
    )


@lru_cache(maxsize=1)
def _get_fallback_chain() -> LLMChain:
    return LLMChain(llm=_get_llm(), prompt=_FALLBACK_PROMPT)


@lru_cache(maxsize=1)
def _get_qa_chain() -> RetrievalQA:
    """
    Build the RetrievalQA chain once and cache it.
    Keep memory footprint lean: small k, no source docs in output.
    """
    vectorstore = _get_vectorstore()
    llm = _get_llm()

    # Keep k=3 as you had; adjust lower if needed for memory/latency.
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3}),
        chain_type="stuff",
        chain_type_kwargs={"prompt": PROMPT},
        return_source_documents=False,  # saves memory
    )


def _similarity_top_score(query: str) -> Optional[float]:
    """
    Return the top similarity score (lower is closer for Qdrant? -> depends on distance).
    Qdrant's default for cosine: higher score means closer similarity if using similarity_search_with_score.
    We'll treat the returned score as "similarity" as in your original code.
    """
    vectorstore = _get_vectorstore()
    docs_and_scores = vectorstore.similarity_search_with_score(query, k=1)
    if not docs_and_scores:
        return None
    _, score = docs_and_scores[0]
    return score


# -------------------------
# 🚦 Public function
# -------------------------

def route_query(query: str) -> dict:
    """
    Public API: same signature and return format as your original file.
    Lazy-loads all heavy components on first call to avoid OOM at startup on Render free tier.
    """
    if not isinstance(query, str):
        return {"query": "", "response": "Invalid query type."}

    q = query.strip()
    q_lower = q.lower()

    # Fast path: keyword override -> go straight to RAG
    if any(kw in q_lower for kw in CRITICAL_KEYWORDS):
        result = _get_qa_chain().invoke({"query": q})
        # RetrievalQA returns a dict with "result"
        if isinstance(result, dict) and "result" in result:
            return {"query": q, "response": result["result"].strip()}
        # Fallback if structure differs
        return {"query": q, "response": str(result).strip()}

    # Similarity probe (cheap) to decide routing
    top_score = _similarity_top_score(q)
    if top_score is None:
        return {"query": q, "response": "Sorry, I have no idea about the query you asked."}

    if top_score >= HIGH_CONFIDENCE:
        result = _get_qa_chain().invoke({"query": q})
        if isinstance(result, dict) and "result" in result:
            return {"query": q, "response": result["result"].strip()}
        return {"query": q, "response": str(result).strip()}

    elif top_score >= LOW_CONFIDENCE:
        return {"query": q, "response": "❌Sorry, I have no idea about the query you asked."}

    # Irrelevant/casual input -> fallback small talk (no Vaasthu)
    fallback = _get_fallback_chain().invoke({"query": q})
    # LLMChain returns dict with "text"
    text = fallback.get("text") if isinstance(fallback, dict) else str(fallback)
    return {"query": q, "response": (text or "").strip()}

# simple_debug_retrieval.py (run from project root)
from chains.rag_pipeline import vectorstore
q = "Where should the kitchen be located?"
docs_and_scores = vectorstore.similarity_search_with_score(q, k=3)
print("Retrieved count:", len(docs_and_scores))
for i, (doc, score) in enumerate(docs_and_scores):
    print(i, "score:", score)
    print("content:", getattr(doc, "page_content", getattr(doc, "content", str(doc)))[:200])

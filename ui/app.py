from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

# from chains.rag_pipeline import run_vaasthu_query
from chains.rag_pipeline import route_query

app = FastAPI()

# ✅ CORS setup to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://172.27.48.1:3000"],  # Update if IP changes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ POST /query endpoint
@app.post("/query")
async def handle_query(request: Request):
    body = await request.json()
    query_text = body.get("query", "")
    print(f"[Query Received] {query_text}")

    try:
        answer = route_query(query_text)
        print(f"[Answer Returned] {answer}")
    except Exception as e:
        print(f"[Error] {e}")
        return {"answer": "⚠️ Error in Vaasthu engine."}

    # ✅ Handle cases where answer is missing or in incorrect format
    if not answer or "response" not in answer:
        return {"answer": "⚠️ No response generated."}

    # ✅ Return only the response part for frontend
    return {"answer": answer["response"]}

# ✅ Mount frontend AFTER API routes
frontend_dist_path = os.path.join(os.path.dirname(__file__), "frontend", "dist")
app.mount("/", StaticFiles(directory=frontend_dist_path, html=True), name="frontend")

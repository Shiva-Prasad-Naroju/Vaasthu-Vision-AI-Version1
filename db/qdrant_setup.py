# File: db/qdrant_setup.py

import os
import json
from qdrant_client import QdrantClient
from langchain_qdrant import Qdrant
from langchain_huggingface import HuggingFaceEmbeddings

def load_data(data_dir):
    docs = []
    for file in os.listdir(data_dir):
        if file.endswith(".json"):
            with open(os.path.join(data_dir, file), "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, list):
                    docs.extend(data)
                else:
                    docs.append(data)
    return docs

def upload_to_qdrant(collection_name="vaasthu_rules"):
    client = QdrantClient(host="localhost", port=6333)

    # ❗ Delete existing collection to ensure clean upload
    if client.collection_exists(collection_name=collection_name):
        client.delete_collection(collection_name=collection_name)
        print(f"🗑️ Deleted existing collection: {collection_name}")

    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    docs = load_data("Data/data_for_qdrant")
    if not docs:
        print("❌ No data found to upload.")
        return

    texts = [doc["page_content"] for doc in docs]
    metadatas = [doc["metadata"] for doc in docs]

    Qdrant.from_texts(
        texts=texts,
        embedding=embeddings,
        metadatas=metadatas,
        collection_name=collection_name
    )

    print(f"✅ Uploaded {len(docs)} documents to Qdrant collection: {collection_name}")

if __name__ == "__main__":
    upload_to_qdrant()

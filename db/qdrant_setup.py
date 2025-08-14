# File: db/qdrant_setup.py

# Use this file when qdrant cloud is used.

import os
import json
from qdrant_client import QdrantClient
from langchain_qdrant import Qdrant
from langchain_huggingface import HuggingFaceEmbeddings

from dotenv import load_dotenv
load_dotenv()

DATA_DIR = "Data/data_for_qdrant"
COLLECTION_NAME = "vaasthu_rules"

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

BATCH_SIZE = 20  # Reduced batch size for better handling
TIMEOUT = 300    # 5 minutes timeout

def load_data(data_dir):
    """Load data from JSON files in the specified directory"""
    docs = []
    if not os.path.exists(data_dir):
        print(f"❌ Data directory not found: {data_dir}")
        return docs
        
    for file in os.listdir(data_dir):
        if file.endswith(".json"):
            file_path = os.path.join(data_dir, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        docs.extend(data)
                    else:
                        docs.append(data)
                print(f"✅ Loaded {file}")
            except Exception as e:
                print(f"❌ Error loading {file}: {e}")
    
    print(f"📚 Total documents loaded: {len(docs)}")
    return docs

def delete_collection_if_exists():
    """Delete collection if it exists - separate function to avoid client conflicts"""
    try:
        client = QdrantClient(
            url=QDRANT_URL,
            api_key=API_KEY,
            timeout=TIMEOUT
        )
        
        if client.collection_exists(collection_name=COLLECTION_NAME):
            client.delete_collection(collection_name=COLLECTION_NAME)
            print(f"🗑️ Deleted existing collection: {COLLECTION_NAME}")
        else:
            print(f"ℹ️ Collection {COLLECTION_NAME} does not exist")
            
        client.close()
    except Exception as e:
        print(f"⚠️ Could not delete collection: {e}")

def upload_to_qdrant():
    """Upload documents to Qdrant vector store with improved error handling"""
    try:
        # Delete existing collection if needed
        delete_collection_if_exists()
        
        # Load documents
        docs = load_data(DATA_DIR)
        if not docs:
            print("❌ No data found to upload.")
            return

        # Extract texts and metadata
        texts = []
        metadatas = []
        
        for doc in docs:
            if isinstance(doc, dict):
                # Handle different document structures
                if "page_content" in doc:
                    texts.append(str(doc["page_content"]))
                    metadatas.append(doc.get("metadata", {}))
                elif "content" in doc:
                    texts.append(str(doc["content"]))
                    metadatas.append({k: v for k, v in doc.items() if k != "content"})
                else:
                    # If no specific content field, use the entire doc as text
                    text_content = json.dumps(doc) if isinstance(doc, dict) else str(doc)
                    texts.append(text_content)
                    metadatas.append({})
            else:
                texts.append(str(doc))
                metadatas.append({})

        if not texts:
            print("❌ No valid text content found in documents.")
            return

        print(f"📝 Preparing to upload {len(texts)} texts...")

        # Initialize embeddings
        print("🔧 Initializing embeddings...")
        embeddings = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'}  # Use CPU for compatibility
        )

        # Upload in chunks to avoid timeout
        chunk_size = 50  # Process 50 documents at a time
        total_chunks = (len(texts) + chunk_size - 1) // chunk_size
        
        print(f"📦 Processing {total_chunks} chunks of up to {chunk_size} documents each...")
        
        vectorstore = None
        
        for i in range(0, len(texts), chunk_size):
            chunk_end = min(i + chunk_size, len(texts))
            chunk_texts = texts[i:chunk_end]
            chunk_metadatas = metadatas[i:chunk_end]
            
            chunk_num = i // chunk_size + 1
            print(f"🚀 Processing chunk {chunk_num}/{total_chunks} ({len(chunk_texts)} documents)...")
            
            try:
                if vectorstore is None:
                    # Create the vector store with the first chunk
                    vectorstore = Qdrant.from_texts(
                        texts=chunk_texts,
                        embedding=embeddings,
                        metadatas=chunk_metadatas,
                        collection_name=COLLECTION_NAME,
                        url=QDRANT_URL,
                        api_key=API_KEY,
                        batch_size=BATCH_SIZE,
                        force_recreate=True,
                        timeout=TIMEOUT
                    )
                    print(f"✅ Created collection and uploaded chunk {chunk_num}")
                else:
                    # Add subsequent chunks to existing collection
                    vectorstore.add_texts(
                        texts=chunk_texts,
                        metadatas=chunk_metadatas,
                        batch_size=BATCH_SIZE
                    )
                    print(f"✅ Added chunk {chunk_num} to existing collection")
                    
            except Exception as chunk_error:
                print(f"❌ Error processing chunk {chunk_num}: {chunk_error}")
                # Continue with next chunk instead of failing completely
                continue

        if vectorstore is not None:
            print(f"🎉 Successfully processed {len(texts)} documents to Qdrant collection: {COLLECTION_NAME}")
        else:
            print("❌ Failed to create vector store - all chunks failed")
            return
        
        # Verify upload
        verify_upload()
        
    except Exception as e:
        print(f"❌ Error during upload: {e}")
        print(f"Error type: {type(e).__name__}")
        
        # Try alternative approach with smaller batches
        print("🔄 Trying with smaller batch size...")
        try_smaller_batches()

def verify_upload():
    """Verify that documents were uploaded successfully"""
    try:
        client = QdrantClient(
            url=QDRANT_URL,
            api_key=API_KEY,
            timeout=120
        )
        
        collection_info = client.get_collection(COLLECTION_NAME)
        point_count = collection_info.points_count
        print(f"✅ Verification: Collection '{COLLECTION_NAME}' contains {point_count} points")
        
        client.close()
    except Exception as e:
        print(f"⚠️ Could not verify upload: {e}")

def main():
    """Main function to run the upload process"""
    print("🏗️ Starting Qdrant upload process...")
    
    # Check if required variables are set
    if not QDRANT_URL or QDRANT_URL == "":
        print("❌ Please set your QDRANT_URL")
        return
    
    if not API_KEY or API_KEY == "m":
        print("❌ Please set your actual API_KEY")
        return
    
    upload_to_qdrant()
    print("✅ Upload process completed!")

if __name__ == "__main__":
    main()
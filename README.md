# 🏡 Vaasthu Vision AI – Project Setup & Notes

### ⚙️ 1. Activate the Environment

  - Activate your Python virtual environment before running the backend.
---
### 🐳 2. Run Qdrant (Vector DB)

  - Make sure you started the docker locally
    
  - docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant

---

### 🗂️ 3. Setup Vector DB
  
  - Run the following script to initialize Qdrant:

    - python db/qdrant_setup.py
---
### 🌐 4. Start Frontend (React + Vite)
  
  - Navigate to the frontend directory:

  - cd C:\Users\DELL\Downloads\GitHub\vva_v1\ui\frontend

  - Install dependencies (only once unless packages change): 

  - npm install

  - Build the React app (⚠️ run this after every change): 

  - npm run build

  - Start the development server: 

  - npm run dev
---
### 🧠 5. Start Backend API Server

  - Use Uvicorn to run the FastAPI server:
  
  - uvicorn ui.app:app --reload
---
### 🔁 6. UI Not Updating After Code Changes?

  - Sometimes, changes may not reflect due to browser cache. Use a hard refresh:

  - Ctrl + Shift + R
---
### 🏗️ 7. Serving React Statically?

  - If React is being served via FastAPI’s StaticFiles, make sure to build after every change: npm run build
---
### 📌 Project Status (as of now)

  - ✅ The project has a final, improved UI.

  - ⚠️ Previously, it gave wrong responses to irrelevant Vaasthu queries like:

    "hi", "hello", "i am shiva", etc.
---
### 🚀 WHAT I DID:

  - 🎉 Solved the major issue:

  - The system now successfully avoids giving Vaasthu answers to irrelevant or non-domain queries.

  - 🌐 This project is now successfully connected to the custom website designed specifically for Vaasthu Vision AI.

# 🏡 Vaasthu Vision AI – Project Setup & Notes

### ⚙️ 1. Activate the Environment

  - Activate your Python virtual environment before running the backend.

  - Then install the requirements using :
      - pip install -r requirements.txt (or)
      - uv pip install requirements.txt (using uv, prefer this for fast installation)
---
### 🐳 2. Run Qdrant (Vector DB)

  - Make sure you started the docker locally
    
    - docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant

  - If qdrant cloud is used, then no need of running the docker. Just upload the dataset directly.

---

### 🗂️ 3. Setup Vector DB
  
  - Run the following script to initialize Qdrant:

    - python db/qdrant_setup.py
---
### 🧠 4. Start Backend API Server

  - Use Uvicorn to run the FastAPI server (always run the backend first to avoid any issues)
  
    - uvicorn ui.app:app --reload

---
### 🌐 5. Start Frontend (React + Vite)
  
  - Navigate to the frontend directory:

    - cd C:\Users\DELL\Downloads\GitHub\vva_v1\ui\frontend

  - Install dependencies (only once unless packages change): 

    - npm install

  - Build the React app (⚠️ run this after every change): 

    - npm run build

  - Start the development server: 

    - npm run dev
  
  - For port forwarding:  Open a new terminal & tunnel it:

    - ngrok http 8000

    - You’ll see something like: Forwarding    https://abcd-1234.ngrok-free.app -> http://localhost:8000
    
    - With this url anyone can access to this project but only while running the project in local system.
---
### 🔁 6. UI Not Updating After Code Changes?

  - Sometimes, changes may not reflect due to browser cache. Use a hard refresh:

    - Ctrl + Shift + R
---
### 🏗️ 7. Serving React Statically?

  - If React is being served via FastAPI’s StaticFiles, make sure to build after every change:

    - npm run build
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


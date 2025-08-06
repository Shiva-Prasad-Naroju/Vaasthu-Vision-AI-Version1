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

---


# 🧠 Vaasthu Vision AI — Generative AI-Powered Vaasthu Consultant

## 🚀 Project Overview  
**Vaasthu Vision AI** is a production-ready GenAI system built to provide authentic, directional, and remedial suggestions based on Vaasthu Shastra.  
It uses a **RAG (Retrieval-Augmented Generation)** architecture to ensure accurate and context-specific answers.


## 🎯 Objective  
To build an AI assistant that:
- Understands Vaasthu rules deeply
- Provides reliable 2–4 line answers
- Avoids hallucinations
- Runs fast on web (connected to a slick frontend)


## 🛠️ Tech Stack  
- **Frontend**: Streamlit + Custom HTML/CSS, deployed via Netlify  
- **Backend**: Python (FastAPI / Streamlit for local)  
- **LLM**: LLaMA3-8B-8192 via **Groq API**  
- **Vector DB**: **Qdrant** with `all-MiniLM-L6-v2` embeddings  
- **RAG**: LangChain-powered pipeline  
- **Deployment**: Local + Render-ready backend, Netlify frontend


## 🧩 Data & Design Decisions  
### 🔧 Data Transformation
- Started with 40 structured Vaasthu elements in JSON  
- Converted to 350+ high-quality natural-language rules  
- Added metadata: `zone`, `rule_id`, `category`  
- Stored using `RULE_START` and `RULE_END` delimiters  


### 🧠 Prompt Engineering  
- Final prompt: minimalistic, 2–4 lines, no emotional tone  
- Designed for clarity, consistency, and production use  
- Used temperature=0 and top_p=1 for deterministic output


### ⚙️ RAG Flow
1. Query → Embedding  
2. Qdrant → Top 3 relevant rules  
3. Custom prompt → Groq LLM (LLaMA3)  
4. Final response → Displayed in UI


## 🧪 Key Features  
✅ Fast, accurate, and deterministic responses  
✅ High-precision similarity search via Qdrant  
✅ UI matched to brand theme (navy, minimal, modern)  
✅ Mobile-responsive and production-ready  
✅ Handles fallback for invalid queries


## 📸 Screenshots  
- 🎨 Homepage with responsive layout  
- 🧾 Query page with side animation/visuals  
- ✅ Answer card showing zone/category-wise recommendations

## 🧠 Learnings  
- Prompt structure impacts hallucination significantly  
- Simpler is better: hardcoded rules > complex intent classifier  
- Fast, reliable LLMs like Groq drastically improve UX  
- Semantic granularity in rules increases RAG accuracy


## 🌐 Live Demo  
🔗 Click here : [Visit Site](https://celebrated-flan-f9b453.netlify.app/)

  or

website : https://celebrated-flan-f9b453.netlify.app/

## 💼 Ready for Production  
The system is ready for real-world integration and can be expanded to:
- Multiple languages  
- Room-by-room suggestions  
- Vaastu-based house plan checker


## 🙌 Special Thanks  
Inspired by traditional Indian architecture wisdom and empowered by modern AI.


## 📬 Connect with Me  
I’m open to collaborations, feedback, or AI-based consulting.  
📧 Email: shivanaroju26@gmail.com



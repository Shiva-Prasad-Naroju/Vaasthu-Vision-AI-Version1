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



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
- **Frontend**: Built the website using bolt ai and customized as desired. 
- **Backend**: Python (FastAPI / Streamlit for local)  
- **LLM**: LLaMA3-8B-8192 via **Groq API**  
- **Vector DB**: **Qdrant** with `all-MiniLM-L6-v2` embeddings  
- **RAG**: LangChain-powered pipeline  

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

✅ Contribute Feature: Allows users to submit data or upload files for review. After admin verification, contributions can be incorporated into the project.

## 🧠 Learnings  
- Prompt structure impacts hallucination significantly  
- Simpler is better: hardcoded rules > complex intent classifier  
- Fast, reliable LLMs like Groq drastically improve UX  
- Semantic granularity in rules increases RAG accuracy


## 🌐 Live Demo of Only frontend without backend integration:
🔗 Click here : [Visit Site](https://jazzy-entremet-70cc2a.netlify.app/)

or

website : https://jazzy-entremet-70cc2a.netlify.app/

## 💼 Ready for Production  
The system is ready for real-world integration and can be expanded to:
- Multiple languages  
- Room-by-room suggestions  
- Vaastu-based house plan checker

## 🐳 Docker Setup

We provide a Docker image for **Vaasthu Vision AI** so you can run the app anywhere without installing dependencies.

### **Prerequisites**
- Docker Desktop installed: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

- A `.env` file with:

  ```env

  - QDRANT_URL=<your-qdrant-cloud-url>
  
  - QDRANT_API_KEY=<your-qdrant-api-key>
  
  - GROQ_API_KEY=<your-groq-api-key>

### Run via Docker Hub Image:

Pull the latest image from Docker Hub:

- docker pull docker.io/shivaprasadnaroju/vaasthu-vision-ai:latest

Run the container with your .env:

- docker run -p 8000:8000 --env-file .env docker.io/shivaprasadnaroju/vaasthu-vision-ai:latest

Visit: http://localhost:8000/docs to access FastAPI Swagger UI.

### Notes:

- The image is preconfigured to connect to Qdrant Cloud via .env.

- For a local Qdrant setup, a separate Docker Compose file can be used

## 🙌 Special Thanks  
Inspired by traditional Indian architecture wisdom and empowered by modern AI.


## 📬 Connect with Me  
I’m open to collaborations, feedback, or AI-based consulting.  
📧 Email: shivanaroju26@gmail.com



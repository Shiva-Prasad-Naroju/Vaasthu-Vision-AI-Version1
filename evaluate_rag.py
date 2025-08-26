# evaluate_rag_simple.py
import json
import time
from datasets import Dataset
from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall
from ragas import evaluate
from chains.rag_pipeline import route_query
from langchain_groq import ChatGroq  
from langchain_community.embeddings import HuggingFaceEmbeddings  
from tqdm import tqdm
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

def prepare_data_with_rate_limiting(eval_data, delay=10):
    """Prepare data with built-in rate limiting"""
    ragas_data = []
    
    print(f"Processing {len(eval_data)} questions with {delay}s delay between batches of 5...")
    
    for i, item in enumerate(tqdm(eval_data, desc="Processing questions")):
        try:
            # Add delay every 5 items to respect rate limits
            if i > 0 and i % 5 == 0:
                print(f"\n⏳ Processed {i} items. Sleeping for {delay} seconds...")
                time.sleep(delay)
            
            pred = route_query(item["question"])
            
            ragas_data.append({
                "question": item["question"],
                "answer": pred["answer"],          
                "ground_truth": item["ground_truth"],
                "contexts": pred.get("contexts", [""])  
            })
            
        except Exception as e:
            print(f"\n❌ Error processing question {i}: {str(e)}")
            # Add placeholder to maintain data alignment
            ragas_data.append({
                "question": item["question"],
                "answer": "Could not generate answer due to error",          
                "ground_truth": item["ground_truth"],
                "contexts": [""]  
            })
            
            # Sleep longer after errors
            time.sleep(15)
            
    return ragas_data

def main():
    print("🚀 Starting RAG Evaluation with Rate Limiting...")
    
    # Step 1: Load eval.json
    with open("Data/eval.json", "r", encoding="utf-8") as f:
        eval_data = json.load(f)
    
    # For testing, limit to first 20 items (remove this line for full evaluation)
    eval_data = eval_data[:20]
    print(f"📊 Evaluating {len(eval_data)} questions...")
    
    # Step 2: Prepare dataset with rate limiting
    ragas_data = prepare_data_with_rate_limiting(eval_data, delay=12)
    dataset = Dataset.from_list(ragas_data)
    
    # Step 3: Configure LLM with conservative settings
    llm = ChatGroq(
        model="llama-3.1-8b-instant",
        temperature=0,
        max_tokens=1024,    # Increased token limit
        timeout=120,        # 2 minute timeout
        max_retries=2,      # Allow retries
        api_key=api_key
    )
    
    # Step 4: Use HuggingFace embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    
    # Step 5: Run evaluation with error handling
    print("\n🔍 Running RAGAS evaluation...")
    try:
        result = evaluate(
            dataset,
            metrics=[faithfulness, answer_relevancy],  # Start with fewer metrics
            llm=llm,
            embeddings=embeddings,
            batch_size=2  # Very small batch size
        )
        
        # Step 6: Print and Save results
        print("\n📊 RAGAS Evaluation Results:")
        print(result)
        
        result.to_pandas().to_csv("ragas_results_simple.csv", index=False)
        print("\n✅ Results saved to ragas_results_simple.csv")
        
    except Exception as e:
        print(f"\n❌ Evaluation failed: {str(e)}")
        print("💡 Try reducing batch size or dataset size further")

if __name__ == "__main__":
    main()


# evaluate_rag.py
# import json
# from datasets import Dataset
# from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall
# from ragas import evaluate
# from chains.rag_pipeline import route_query
# from langchain_groq import ChatGroq  
# from langchain_community.embeddings import HuggingFaceEmbeddings  

# import os
# from dotenv import load_dotenv
# load_dotenv()
# api_key = os.getenv("GROQ_API_KEY")

# # Step 1: Load eval.json
# with open("Data/eval.json", "r", encoding="utf-8") as f:
#     eval_data = json.load(f)

# # Step 2: Prepare dataset for Ragas
# ragas_data = []
# for item in eval_data:
#     pred = route_query(item["question"])
#     ragas_data.append({
#         "question": item["question"],
#         "answer": pred["answer"],          
#         "ground_truth": item["ground_truth"],
#         "contexts": pred.get("contexts", [""])  
#     })

# dataset = Dataset.from_list(ragas_data)

# # Step 3: Define Groq LLM for evaluation
# llm = ChatGroq(
#     model="llama-3.1-8b-instant",
#     temperature=0,
#     max_tokens=512,
#     api_key=api_key
# )

# # ✅ Step 4: Use HuggingFace embeddings (instead of OpenAI)
# embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# # Step 5: Run evaluation with Groq + HuggingFace embeddings
# result = evaluate(
#     dataset,
#     metrics=[faithfulness, answer_relevancy, context_precision, context_recall],
#     llm=llm,
#     embeddings=embeddings  # ✅ prevent OpenAI call
# )

# # Step 6: Print and Save results
# print("\n📊 RAGAS Evaluation Results:")
# print(result)

# result.to_pandas().to_csv("ragas_results.csv", index=False)
# print("\n✅ Results saved to ragas_results.csv")

import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from Services.qdrant_service import search_jobs

load_dotenv()
llm = ChatGroq(model = "llama-3.3-70b-versatile",
               api_key = os.getenv("GROQ_API_KEY"),
               temperature = 0.3,
)

rag_prompt = ChatPromptTemplate.from_messages([
    ("system","""You are a job search assistant
     Use the following job listing retrieved from the database to answer if no relevant jobs are found, say so clearly.\
     
     Retrieved Jobs:
     {context}"""),
     ("human","{question}")
])

rag_chain = rag_prompt | llm

def rag_job_search(query: str, top_k: int = 5) -> str:
    results = search_jobs(query, top_k=5)
    if not results:
        return "No jobs found in the database. Please embed jobs first using the /rag/embed-jobs endpoint ."
    
    context = "\n".join([
    f"Title: {job['title']}\n"
    f"Description: {job['description']}\n"
    f"Salary: {job['salary']}"
    for job in results
])
    
    response = rag_chain.invoke(
        {
            "context": context,
            "question": query,
        }
    )
    return response.content
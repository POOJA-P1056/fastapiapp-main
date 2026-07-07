import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Semantic Search
export const searchJobs = async (query: string) => {
  const response = await API.post("/rag/search", {
    query,
  });
  return response.data;
};

// AI Chat
export const askAI = async (question: string) => {
  const response = await API.post("/rag/ask", {
    question,
  });
  return response.data;
};

// Resume Analysis
export const analyseResume = async (resume_text: string) => {
  const response = await API.post("/rag/analyse-resume", {
    resume_text,
  });
  return response.data;
};

// Job Match
export const matchJobs = async (
  skills: string,
  experience: string
) => {
  const response = await API.post("/rag/job-match", {
    skills,
    experience,
  });

  return response.data;
};

// Embed Jobs
export const embedJobs = async () => {
  const response = await API.post("/rag/embed-jobs");
  return response.data;
};
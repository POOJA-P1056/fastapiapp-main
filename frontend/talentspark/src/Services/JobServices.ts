import axios from "axios";
import type {job} from "../types/job"

const API_BASE_URL = "http://localhost:8000";

export async function getJobs(id: number): Promise<job[] > {
    const response = await axios.get(`${API_BASE_URL}/job/${id}`);
    return response.data;
}

export async function createJobs(job: job):
Promise<job> {
    const response = await axios.post(`${API_BASE_URL}/job`,job);
    return response.data;
}

export async function updateJobs(id: number, job:job): Promise<job>{
    const response = await axios.put(`${API_BASE_URL}/job/${id}`,job);
    return response.data
}

export async function deleteJobs(id: number): Promise<void>{
    const response = await axios.delete(`${API_BASE_URL}/job/${id}`);
    return response.data
}
import { useState } from "react";
import { searchJobs } from "../Services/ragService";
import JobCard from "../components/JobCard";

interface Job {
  job_id: number;
  title: string;
  description: string;
  salary: number;
  score: number;
}

const AISearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await searchJobs(query);

      setJobs(response.results || []);
      setSearched(true);
    } catch (error) {
      console.error(error);
      alert("Unable to search jobs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">AI Job Search</h2>

      <div className="input-group mb-4">

        <input
          type="text"
          className="form-control"
          placeholder="Example: Python Developer with FastAPI"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {!loading && searched && jobs.length === 0 && (
        <div className="alert alert-warning">
          No matching jobs found.
        </div>
      )}

      {!loading &&
        jobs.map((job) => (
          <div key={job.job_id} className="mb-3">

            <JobCard job={job} />

            <div className="text-end">
              <span className="badge bg-success">
                Match Score : {(job.score * 100).toFixed(1)}%
              </span>
            </div>

          </div>
        ))}
    </div>
  );
};

export default AISearch;
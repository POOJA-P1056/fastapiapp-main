import { useState } from "react";
import { matchJobs } from "../services/ragService";

interface MatchJob {
    job_id: number;
    title: string;
    description: string;
    salary: number;
    match_score: number;
}

const JobMatch = () => {

    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [jobs, setJobs] = useState<MatchJob[]>([]);
    const [loading, setLoading] = useState(false);

    const handleMatch = async () => {

        if (!skills.trim()) {
            alert("Enter your skills.");
            return;
        }

        setLoading(true);

        try {

            const response = await matchJobs(
                skills,
                experience
            );

            setJobs(response.matches || []);

        } catch (error) {

            console.error(error);
            alert("Unable to match jobs.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                AI Job Match
            </h2>

            <div className="mb-3">

                <label className="form-label">
                    Skills
                </label>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Python, FastAPI, React"
                    value={skills}
                    onChange={(e) =>
                        setSkills(e.target.value)
                    }
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Experience
                </label>

                <input
                    type="text"
                    className="form-control"
                    placeholder="2 Years"
                    value={experience}
                    onChange={(e) =>
                        setExperience(e.target.value)
                    }
                />

            </div>

            <button
                className="btn btn-primary"
                onClick={handleMatch}
            >
                Match Jobs
            </button>

            {loading && (

                <div className="mt-3">
                    Matching Jobs...
                </div>

            )}

            <div className="mt-4">

                {jobs.map((job) => (

                    <div
                        key={job.job_id}
                        className="card shadow-sm mb-3"
                    >

                        <div className="card-body">

                            <h4>{job.title}</h4>

                            <p>{job.description}</p>

                            <p>

                                <strong>Salary : </strong>

                                ₹{job.salary}

                            </p>

                            <span className="badge bg-success">

                                Match Score :
                                {" "}
                                {(job.match_score * 100).toFixed(1)}%

                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default JobMatch;
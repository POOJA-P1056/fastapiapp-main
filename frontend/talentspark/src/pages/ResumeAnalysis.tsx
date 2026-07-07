import { useState } from "react";
import { analyseResume } from "../services/ragService";

const ResumeAnalysis = () => {
    const [resume, setResume] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAnalyse = async () => {
        if (!resume.trim()) {
            alert("Please enter your resume.");
            return;
        }

        setLoading(true);

        try {
            const response = await analyseResume(resume);
            setAnalysis(response.analysis);
        } catch (error) {
            console.error(error);
            alert("Failed to analyse resume.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">AI Resume Analysis</h2>

            <textarea
                className="form-control"
                rows={12}
                placeholder="Paste your resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
            />

            <button
                className="btn btn-success mt-3"
                onClick={handleAnalyse}
            >
                Analyse Resume
            </button>

            {loading && (
                <div className="mt-3">
                    Analysing Resume...
                </div>
            )}

            {analysis && (
                <div className="card mt-4 shadow-sm">
                    <div className="card-header">
                        <h4>Analysis Result</h4>
                    </div>

                    <div className="card-body">
                        <pre style={{whiteSpace:"pre-wrap"}}>
                            {analysis}
                        </pre>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ResumeAnalysis;
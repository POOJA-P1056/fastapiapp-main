import { useState } from "react";
import { embedJobs } from "../services/ragService";

const EmbedJobs = () => {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmbed = async () => {

        setLoading(true);

        try {

            const response = await embedJobs();

            setMessage(response.message);

        } catch (error) {

            console.error(error);

            setMessage("Embedding failed.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body text-center">

                    <h2 className="mb-4">

                        Embed Jobs into Qdrant

                    </h2>

                    <p>

                        Click the button below whenever
                        new jobs are added to PostgreSQL.

                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={handleEmbed}
                    >

                        {loading
                            ? "Embedding..."
                            : "Embed Jobs"}

                    </button>

                    {message && (

                        <div className="alert alert-success mt-4">

                            {message}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};

export default EmbedJobs;
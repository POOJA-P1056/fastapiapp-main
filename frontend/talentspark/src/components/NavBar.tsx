type Props = {
    currentPage: string;
    onNavigate: (page: string) => void;
}

function NavBar({ currentPage, onNavigate }: Props) {
    return (
        <nav className="navbar">
            <h1>TalentSpark</h1>

            <div className="nav-buttons">

                <button
                    onClick={() => onNavigate("home")}
                    disabled={currentPage === "home"}
                    className="nav-button"
                >
                    Home
                </button>

                <button
                    onClick={() => onNavigate("chat")}
                    disabled={currentPage === "chat"}
                    className="nav-button"
                >
                    Chat
                </button>

                {/* New AI Search Button */}
                <button
                    onClick={() => onNavigate("ai-search")}
                    disabled={currentPage === "ai-search"}
                    className="nav-button"
                >
                    AI Search
                </button>

                <button
                    onClick={() => onNavigate("resume-analysis")}
                    disabled={currentPage === "resume-analysis"}
                    className="nav-button"
                >
                    Resume Analysis
                </button>
                <button
                    onClick={() => onNavigate("job-match")}
                    disabled={currentPage === "job-match"}
                    className="nav-button"
                >
                    Job Match
                </button>
                <button
                    onClick={() => onNavigate("embed")}
                    disabled={currentPage === "embed"}
                    className="nav-button"
                >
                    Embed Jobs
                </button>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                    className="nav-button"
                >
                    Logout
                </button>

            </div>
        </nav>
    )
}

export default NavBar;
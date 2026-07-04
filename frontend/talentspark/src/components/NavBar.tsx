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

export default NavBar
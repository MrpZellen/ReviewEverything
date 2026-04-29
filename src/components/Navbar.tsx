import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar(){
    return (
        <nav className="navbar">
            <div className="nav-logo">Review Everything</div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/search" className="nav-link">Search</Link>
            </div>
        </nav>
    );
}
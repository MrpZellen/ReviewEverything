// import { Link } from "react-router-dom";
// import "./navbar.css";

// export default function Navbar(){
//     return (
//         <nav className="navbar">
//             <div className="nav-logo">Review Everything</div>
//             <div className="nav-links">
//                 <Link to="/" className="nav-link">Home</Link>
//                 <Link to="/search" className="nav-link">Search</Link>
//             </div>
//         </nav>
//     );
// }

import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo" aria-label="Review Everything Home">
        RE
      </NavLink>

      <div className="nav-search">
        <input type="text" placeholder="Search movies, reviews..." />
        <span>⌕</span>
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Movies
        </NavLink>

        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Reviews
        </NavLink>

        <NavLink
          to="/write-review/:movieID"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Write Review
        </NavLink>
        
      </div>

      <button className="signin-btn">Sign In</button>
    </nav>
  );
}
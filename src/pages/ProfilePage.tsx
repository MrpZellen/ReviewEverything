import { useState } from "react"
import "./style/profilepage.css";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("reviews");
    type User {
        username: string,
        joined: string,
        bio: string,
        avatar?: string,
        stats: {
            totalReviews: number,
            totalLiked: number,
            avgRating: number,
        };
    };
    const user: User = {
        // mock data
        username: "I<3Moviez",
        joined: "May 2026",
        bio:"I love animation movies!",
        avatar: "",
        stats: {
            totalReviews: 10,
            totalLiked: 6,
            avgRating: 8.2,
        }
    };
    return (
        <div className="profile-header profile-page">
            <div className="profile-header neon-card">
                <div className="avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt="avatar"/>
                    ): (
                        <div className="avatar-placeholder">👤</div>
                    )}
                </div>
                <div className="profile-info">
                    <h1 className="page-title">{user.username}</h1>
                    <p>Joined: {user.joined}</p>
                    <p>{user.bio}</p>
                    <div className="stats">
                        <div>Reviews: {user.stats.totalReviews}</div>
                        <div>Liked: {user.stats.totalLiked}</div>
                        <div>Average Rating: {user.stats.avgRating}</div>
                    </div>
                </div>
            </div>
            <div className="tabs">
                <button onClick={() => setActiveTab("reviews")} className="neon-button">Reviews</button>
                <button onClick={() => setActiveTab("ratings")} className="neon-button">Ratings</button>
                <button onClick={() => setActiveTab("likes")} className="neon-button">Liked Movies</button>
            </div>
            {activeTab === "reviews" && (
                <div className="section">
                    <h2 className="section-title">Your Reviews</h2>
                    <div className="list">
                        <div className="item neon-card">
                            <img className="poster" src="https://image.tmdb.org/t/p/w200/placeholder.jpg"/>
                            <div>
                                <h3>Movie Title</h3>
                                <p>"Amaaaazing!!"</p>
                                <span>8/10</span>
                                <div className="actions">
                                    <button className="sml-btn">Edit</button>
                                    <button className="sml-btn danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Add Ratings and Likes Here */}
            {activeTab === "ratings" && (
                <div className="section">
                    <h2 className="section-title">Your Ratings</h2>
                    <div className="auto-grid">
                        <div className="neon-card rating-card">
                            <img className="poster" src="https://image.tmdb.org/t/p/w200/placeholder.jpg"/>
                            <p>Movie Title</p>
                            <p>5/10</p>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === "likes" && (
                <div className="section">
                    <h2 className="section-title">Liked Movies</h2>
                    <div className="auto-grid">
                        <Link to="/movie/1" className="neon-card rating-card">
                            <img className="poster" src="https://image.tmdb.org/t/p/w200/placeholder.jpg"/>
                            <p>Movie Title</p>
                        </Link>
                    </div>
                </div>
            )}
            <div className="actions-bar">
                <button className="neon-button">Edit Profile</button>
                <button className="neon-button danger">Delete Account</button>
                <button className="neon-button">Logout</button>
            </div>
        </div>
    );
}
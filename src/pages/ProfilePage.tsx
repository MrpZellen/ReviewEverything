import { useState } from "react"
import "./style/profilepage.css";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("reviews");
    type User = {
        username: string,
        joined: string,
        bio: string,
        avatar?: string,
        stats: {
            totalReviews: number,
            totalLiked: number,
            avgRating: number,
        },
        reviews: [],
        ratings: [],
        likes: [],
    };
    const user: User = {
        // mock data
        username: "I<3Moviez",
        joined: "May 2026",
        bio: "I love animation movies!",
        avatar: "",
        stats: {
            totalReviews: 10,
            totalLiked: 6,
            avgRating: 8.2,
        },
        reviews: [],
        ratings: [],
        likes: [],
    };
    return (
        <div className="profile-page">
            <div className="profile-banner neon-card">
                <div className="profile-header">
                    <div className="avatar">
                        {user.avatar && user.avatar.length > 0 ? (
                            <img src={user.avatar} alt={user.username} />
                        ) : (
                            <div className="avatar-placeholder">
                                {user.username.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="profile-info">
                        <p className="joined-text">Joined: {user.joined}</p>
                        <h1 className="page-title">{user.username}</h1>
                        <p className="profile-bio">{user.bio}</p>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">{user.stats.totalReviews}</span>
                                <span className="stat-label">Reviews</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{user.stats.totalLiked}</span>
                                <span className="stat-label">Likes</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{user.stats.avgRating}</span>
                                <span className="stat-label">Avg Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tabs">
                    <button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "tab-button active" : "tab-button"}>Reviews</button>
                    <button onClick={() => setActiveTab("ratings")} className={activeTab === "ratings" ? "tab-button active" : "tab-button"}>Ratings</button>
                    <button onClick={() => setActiveTab("likes")} className={activeTab === "likes" ? "tab-button active" : "tab-button"}>Liked Movies</button>
                </div>
                {activeTab === "reviews" && (
                    <div className="section">
                        <h2 className="section-title">Your Reviews</h2>
                        {user.reviews.length === 0 ? (
                            <div className="empty-state neon-card">
                                <div className="empty-icon">✎𓂃</div>
                                <h3>No Reviews</h3>
                                <p>Share your thoughts on a movie and start building your profile</p>
                                <Link to="/search" className="empty-action">Find a Movie</Link>
                            </div>
                        ) : (
                            <div className="list">
                                Reviews Go Here
                            </div>
                        )}
                    </div>
                )}
                {/* Add Ratings and Likes Here */}
                {activeTab === "ratings" && (
                    <div className="section">
                        <h2 className="section-title">Your Ratings</h2>
                        {user.ratings.length === 0 ? (
                            <div className="empty-state neon-card">
                                <div className="empty-icon">★★★★★</div>
                                <h3>No Ratings</h3>
                                <p>Rate some movies to see your favorites and average score</p>
                                <Link to="/search" className="empty-action">Find a Movie</Link>
                            </div>
                        ) : (
                            <div className="auto-grid">
                                Rating Go Here
                            </div>
                        )}
                    </div>
                )}
                {activeTab === "likes" && (
                    <div className="section">
                        <h2 className="section-title">Liked Movies</h2>
                        {user.likes.length === 0 ? (
                            <div className="empty-state neon-card">
                                <div className="empty-icon">🖒</div>
                                <h3>No Liked Movies</h3>
                                <p>Tap the like button on a movie to save it to your profile</p>
                            </div>
                        ) : (
                            <div className="auto-grid">
                                Likes Go Here
                            </div>
                        )}
                    </div>
                )}
                <div className="actions-bar">
                    <button className="action-button">Edit Profile</button>
                    <button className="action-button danger">Delete Account</button>
                    <button className="action-button">Logout</button>
                </div>
            </div>
        </div>
    );
}
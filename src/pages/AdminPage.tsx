import { useEffect, useState } from "react";
import "./style/adminpage.css";
import { Navigate } from "react-router-dom";

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true); //TODO: correctly define admin status by reading from browser
    const [reviews, setReviews] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [username, setUsername] = useState('johnAdmin')

    useEffect(() => {
    const fetchReviews = async () => {
        try {
            const res = await fetch(
                `http://localhost:3100/api/reviews/top`
            );
            const data = await res.json();
            setReviews(data.reviews);
        } catch (err) {
            console.error('Trump did it', err);
        }
    };
        fetchReviews();
    }, []);

    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const res = await fetch(
                `http://localhost:3100/api/users/top`
            );
            const data = await res.json();
            setUsers(data.reviews);
        } catch (err) {
            console.error('Trump did it', err);
        }
    };
        fetchUsers();
    }, []);

    function deleteReview(){
        console.log('review deleted')
    }

  return (
  <main>
    {(loading) && (
        <h2>loading page...</h2>
    )}
    {(isAdmin && !loading) && 
    (<div>
        <h1>Welcome to the admin dashboard, {username}!</h1>
        <div className="section">
            <h2>Top 50 Reviews</h2>
            <div className="grid">
                {reviews.map((review: any) => (
                    <div key={review.movieID} className="card">
                        <p className="supertext">{review.title} - <strong>{review.rating}</strong></p>
                        <p className="subtext">Reviewed by: {review.username}</p>
                        <p>{review.content}</p>
                        <p className="subtext">ThumbsUp: {review.thumbsUp}, ThumbsDown: {review.thumbsDown}</p>
                        <button onClick={deleteReview}/>
                    </div>
                ))}
            </div>
        </div>
        <div className="section">
            <h2>Top 50 Users</h2>
            <div className="grid">
                {users.map((user: any) => (
                    <div key={user.userID} className="card">
                        <p className="supertext"><strong>{user.username}</strong></p>
                        <p className="subtext">{user.description}</p>
                        <p>Is Admin: {user.isAdmin}</p>
                        <p className="subtext">ThumbsUp: {review.thumbsUp}, ThumbsDown: {review.thumbsDown}</p>
                        <button onClick={deleteReview}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
    }
    {(!isAdmin && !loading) && 
    <Navigate to='/' />
    }
  </main>
  );
}
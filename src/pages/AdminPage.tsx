    import { useEffect, useState } from "react";
    import "./style/adminpage.css";
    import { Navigate } from "react-router-dom";

    export default function AdminPage() {
        const [loading, setLoading] = useState(true);
        const [userLoaded, setUserLoaded] = useState(false);
        const [reviewLoaded, setReviewLoaded] = useState(false);
        const [isAdmin, setIsAdmin] = useState(true); //TODO: correctly define admin status by reading from browser
        const [reviews, setReviews] = useState<any>([]);
        const [showDeleted, setShowDeleted] = useState(false);
        const [users, setUsers] = useState<any>([]);
        const [username, setUsername] = useState('johnAdmin')

        useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3100/api/reviews/top`
                );
                if (!res.ok){
                    throw new Error("" + res);
                }
                const data = await res.json();
                setReviews(data.reviews ?? []);
            } catch (err) {
                console.error('Trump did it', err);
            } finally {
            setReviewLoaded(true);
            console.log('wow we reviewed')
            }
        };
        fetchReviews()
        }, []);

        useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3100/api/users/top`
                );
                if (!res.ok){
                    throw new Error("" + res);
                }
                const data = await res.json();
                console.log('users data:', data);
                setUsers(data.users ?? []);
            } catch (err) {
                console.error('Trump did it', err);
            }finally {
            setUserLoaded(true); 
            console.log('wow we usered')
            }
        };
        fetchUsers()
        }, []);
        

        useEffect(() => {
            if(userLoaded && reviewLoaded){
                setLoading(false)
            }
        }, [userLoaded, reviewLoaded])

        async function deleteReview(reviewID: number) {
    try {
        const res = await fetch(`http://localhost:3100/api/user/reviews`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviewID })
        });
        if (!res.ok) throw new Error("" + res);
        setReviews((prev: any[]) => prev.filter(r => r._id !== reviewID));
    } catch (err) {
        console.error('Trump did it', err);
    }
}

async function deleteUser(userID: number) {
    try {
        const res = await fetch(`http://localhost:3100/api/user`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID })
        });
        if (!res.ok) throw new Error("" + res);
        setUsers((prev: any[]) => prev.filter(u => u.userID !== userID));
    } catch (err) {
        console.error('Trump did it', err);
    }
}

async function addAdmin(userID: number) {
    try {
        const res = await fetch(`http://localhost:3100/api/user/admin`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID })
        });
        if (!res.ok) throw new Error("" + res);
        setUsers((prev: any[]) => prev.map(u => u.userID === userID ? { ...u, isAdmin: true } : u));
    } catch (err) {
        console.error('Trump did it', err);
    }
}

async function removeAdmin(userID: number) {
    try {
        const res = await fetch(`http://localhost:3100/api/user`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID, isAdmin: false })
        });
        if (!res.ok) throw new Error("" + res);
        setUsers((prev: any[]) => prev.map(u => u.userID === userID ? { ...u, isAdmin: false } : u));
    } catch (err) {
        console.error('Trump did it', err);
    }
}

    return (
    <main>
        {(loading) && (
            <h2>    loading page...</h2>
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
                            <button onClick={() => deleteReview(review._id)}>Delete Review</button>
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
                            {(user.isAdmin) && 
                            <div className="card">
                                <p className="supertext">User is admin</p>
                                <button onClick={() => removeAdmin(user.userID)}>Remove Admin</button>
                            </div>
                            }
                            {(!user.isAdmin) && 
                            <div className="card">
                                <button onClick={() => addAdmin(user.userID)}>Add Admin</button>
                            </div>
                            }
                            <button onClick={() => deleteUser(user.userID)}>Delete User</button>
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
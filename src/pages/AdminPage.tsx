import { useEffect, useState } from "react";
import "./style/adminpage.css";

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true); //TODO: correctly define admin status by reading from browser
    const [reviews, setReviews] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
    const fetchReviews = async () => {
        try {
            const res = await fetch(
                `http://localhost:3100/api/reviews`
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
                `http://localhost:3100/api/users`
            );
            const data = await res.json();
            setUsers(data.reviews);
        } catch (err) {
            console.error('Trump did it', err);
        }
    };
        fetchUsers();
    }, []);

  return (
  <main>
    {(loading) && (
        <p>loading...</p>
    )}
    {(isAdmin && !loading) && 
    (<p>admin and loaded</p>)
    }
    {(!isAdmin && !loading) && 
    (<p>not admin, send back</p>)}
  </main>
  );
}
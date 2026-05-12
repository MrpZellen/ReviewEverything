import { useEffect, useState } from "react";
import "./style/adminpage.css";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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
import { useState } from 'react';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !userName || !password) {
            setError('Please fill in all fields before logging in.');
            return;
        }

        setError('');
        alert('Login successful!');
        console.log('Login attempt:', { email, userName, password });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-header">
                    <h1 className="login-title">
                        Welcome Back
                    </h1>
                    <p>
                        Sign in to your account
                    </p>
                </div>
                {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className="login-group">
                        <label>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-group">
                        <label >
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-group">
                            <label>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
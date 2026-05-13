import { useState } from "react";
import "./register.css";

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Registration attempt:', { email, userName, password });
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <div className="register-header">
                    <h1 className="register-title">
                        Create an Account
                    </h1>
                    <p>
                        Sign up to get started
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="register-form-fields">
                    <div>
                        <label className="register-label">
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
                    <div>
                        <label className="register-label">
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
                    <div>
                        <label className="register-label">
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
                    <button type="submit" className="register-button">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
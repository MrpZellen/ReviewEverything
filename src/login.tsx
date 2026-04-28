import { useState } from 'react';

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
        <div>
            <div>
                <div>
                    <h1>
                        Welcome Back
                    </h1>
                    <p>
                        Sign in to your account
                    </p>
                </div>
                {error && (
                    <div style={{
                        color: 'red',
                        marginBottom: '15px',
                        padding: '10px',
                        border: '1px solid red',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div>
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
                    <div>
                        <label>
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
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
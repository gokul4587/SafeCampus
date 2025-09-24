
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const { login } = useAuth();

    // Sign In state
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    // Sign Up state
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpRole, setSignUpRole] = useState('student');
    const [signUpError, setSignUpError] = useState(''); // Added error state

    const navigate = useNavigate();

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'grant_type': 'password',
                'username': signInEmail, // Assuming email is used as username for login
                'password': signInPassword,
            })
        });
        if (response.ok) {
            const data = await response.json();
            login(data.access_token);
            navigate('/');
        } else {
            // Handle error
            console.error('Login failed');
            // You might want to show an error message to the user
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setSignUpError(''); // Clear previous errors

        // Validation for Faculty/Staff email
        if (signUpRole === 'faculty' && !signUpEmail.endsWith('@university.edu')) {
            setSignUpError('Faculty/Staff must use a valid university email address (e.g., name@university.edu).');
            return;
        }

        // NOTE: This assumes your backend has a POST /users endpoint for creating a new user.
        // You may need to adjust the endpoint and payload.
        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: signUpName,
                email: signUpEmail,
                password: signUpPassword,
                role: signUpRole,
            })
        });
        if (response.ok) {
            console.log('Signup successful');
            const tokenResponse = await fetch('/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'grant_type': 'password',
                    'username': signUpEmail,
                    'password': signUpPassword,
                })
            });
            if (tokenResponse.ok) {
                const data = await tokenResponse.json();
                login(data.access_token);
                navigate('/');
            } else {
                setSignUpError('Signup successful, but login failed. Please try signing in.');
            }
        } else {
            const errorData = await response.json();
            setSignUpError(errorData.detail || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className={`main-container ${isSignUpActive ? 'right-panel-active' : ''}`}>
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
                    <h1>Create Account</h1>
                    <div className="role-selection">
                        <label>
                            <input type="radio" name="role" value="student" checked={signUpRole === 'student'} onChange={(e) => setSignUpRole(e.target.value)} />
                            Student
                        </label>
                        <label>
                            <input type="radio" name="role" value="faculty" checked={signUpRole === 'faculty'} onChange={(e) => setSignUpRole(e.target.value)} />
                            Faculty/Staff
                        </label>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
                    {signUpError && <p className="error-message">{signUpError}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSignInSubmit}>
                    <h1>Sign in</h1>
                    <input type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required />
                    <Link to="/forgot-password">Forgot your password?</Link>
                    <button type="submit">Sign In</button>
                    <div className="divider">Or continue with</div>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-google"></i></a>
                        <a href="#" className="social"><i className="fab fa-apple"></i></a>
                    </div>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>One of Us?</h1>
                        <p>If you already have an account, just sign in. We've missed you!</p>
                        <button className="ghost" onClick={() => setIsSignUpActive(false)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>New Here?</h1>
                        <p>Join us and start your journey. Sign up and discover a great amount of new opportunities!</p>
                        <button className="ghost" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

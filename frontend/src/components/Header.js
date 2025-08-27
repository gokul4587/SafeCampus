import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let user = null;
    if (token) {
        try {
            user = jwtDecode(token);
        } catch (error) {
            // Invalid token
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="site-header">
            <div className="container">
                <Link to="/" className="logo">Campus Safe</Link>
                <nav>
                    <ul className="nav-links">
                        <li><NavLink to="/" end activeClassName="active">Home</NavLink></li>
                        <li><NavLink to="/report" activeClassName="active">Report</NavLink></li>
                        <li><NavLink to="/learn" activeClassName="active">Learn</NavLink></li>
                        <li><NavLink to="/get-help" activeClassName="active">Get Help</NavLink></li>
                        {user && user.role === 'admin' && (
                            <li><NavLink to="/admin" activeClassName="active">Admin</NavLink></li>
                        )}
                        {user ? (
                            <li><button onClick={handleLogout}>Logout</button></li>
                        ) : (
                            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
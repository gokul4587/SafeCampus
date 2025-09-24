import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        // Close menu when screen is resized to desktop
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="site-header">
            <div className="container header-container">
                <Link to="/" className="logo">Campus Safe</Link>

                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/report">Report</NavLink>
                    <NavLink to="/learn">Learn</NavLink>
                    <NavLink to="/get-help">Get Help</NavLink>
                </nav>

                <div className="header-actions">
                    {user ? (
                        <>
                            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="login-icon logged-in" aria-label="Dashboard">
                                <span className="material-symbols-outlined">account_circle</span>
                            </Link>
                            <button onClick={logout} className="logout-button">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="login-icon" aria-label="Login">
                            <span className="material-symbols-outlined">account_circle</span>
                        </Link>
                    )}
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

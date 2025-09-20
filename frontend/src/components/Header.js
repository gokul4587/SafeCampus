import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <Link to="/login" className="login-icon" aria-label="Login">
                        <span className="material-symbols-outlined">account_circle</span>
                    </Link>
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

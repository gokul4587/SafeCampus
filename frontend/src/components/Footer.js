import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <p>&copy; 2025 Campus Safe. All Rights Reserved. | <Link to="/privacy">Privacy Policy</Link></p>
            </div>
        </footer>
    );
};

export default Footer;

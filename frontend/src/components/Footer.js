import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="footer-column footer-about">
                    <h3 className="footer-logo">Campus Safe</h3>
                    <p className="mission-statement">Your trusted platform for anonymous reporting and access to wellness resources. We are committed to fostering a safer campus environment for everyone.</p>
                    <div className="social-media-icons">
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-column footer-quick-links">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/report">Report a Tip</Link></li>
                        <li><Link to="/learn">Learn</Link></li>
                        <li><Link to="/get-help">Get Help</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className="footer-column footer-contact">
                    <h4 className="footer-heading">Contact Us</h4>
                    <ul>
                        <li><a href="mailto:support@campussafe.com">support@campussafe.com</a></li>
                        <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
                        <li>123 University Drive, Campus Town</li>
                    </ul>
                </div>
            </div>
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} Campus Safe. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
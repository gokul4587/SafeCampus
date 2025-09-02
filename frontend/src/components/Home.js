import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main>
            <section className="hero">
                <div className="container">
                    <h1>A Safe Space for Students</h1>
                    <p>Anonymously report concerns, find drug awareness resources, and connect with counselors. Your well-being is our priority.</p>
                    <div className="cta-container">
                        <Link to="/report" className="cta-btn">Submit an Anonymous Tip</Link>
                        <Link to="/login" className="cta-btn">Wellness Hub Login</Link>
                    </div>
                    
                    <div className="card-grid">
                        <Link to="/report" className="card">
                            <span className="material-symbols-outlined">report</span>
                            <h3>Report an Issue</h3>
                            <p>Submit a confidential report about drug-related activity on campus. Your identity is always protected.</p>
                        </Link>
                        <Link to="/learn" className="card">
                            <span className="material-symbols-outlined">school</span>
                            <h3>Learn & Stay Aware</h3>
                            <p>Access videos and articles to understand the risks, recognize signs, and learn coping strategies.</p>
                        </Link>
                        <Link to="/get-help" className="card">
                            <span className="material-symbols-outlined">support_agent</span>
                            <h3>Get Help Now</h3>
                            <p>Find contact information for campus counselors, therapists, and national support helplines.</p>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container">
                <h2>Why Campus Safe?</h2>
                <div className="trust-grid">
                    <div className="trust-item">
                        <span className="material-symbols-outlined">verified_user</span>
                        <h3>Completely Anonymous</h3>
                        <p>Your reports are 100% anonymous. We use advanced security measures to protect your identity.</p>
                    </div>
                    <div className="trust-item">
                        <span className="material-symbols-outlined">speed</span>
                        <h3>Secure & Fast</h3>
                        <p>Our platform is built on a secure infrastructure, ensuring your reports are submitted quickly and safely.</p>
                    </div>
                    <div className="trust-item">
                        <span className="material-symbols-outlined">healing</span>
                        <h3>Supportive Resources</h3>
                        <p>We provide access to a wealth of resources to help you stay informed and get the support you need.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import Faq from '../components/Faq';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
    return (
        <main>
            <section className="hero">
                <div className="container">
                    <div className="hero-content" data-aos="fade-up">
                        <h1>A Safe & Supportive Campus for Everyone</h1>
                        <p>Anonymously report concerns, find drug awareness resources, and connect with counselors. Your well-being is our priority.</p>
                        <div className="cta-container">
                            <Link to="/report" className="btn btn-primary">Submit a Tip</Link>
                            <Link to="/learn" className="btn btn-secondary">Learn More</Link>
                        </div>
                    </div>
                    <div className="hero-image" data-aos="fade-left" data-aos-delay="200">
                        <img src="https://placehold.co/450x400/E2E8F0/2D3748?text=Community+%26+Safety" alt="Illustration of a safe and supportive community" />
                    </div>
                </div>
            </section>

            <section className="full-width-section bg-light">
                <div className="container">
                    <h2 data-aos="fade-up">Your Voice, Your Safety</h2>
                    <div className="card-grid">
                        <Link to="/report" className="card" data-aos="fade-up" data-aos-delay="100">
                            <span className="material-symbols-outlined">security</span>
                            <h3>Anonymous Reporting</h3>
                            <p>Submit a confidential report about drug-related activity or other concerns. Your identity is always protected.</p>
                        </Link>
                        <Link to="/learn" className="card" data-aos="fade-up" data-aos-delay="200">
                            <span className="material-symbols-outlined">school</span>
                            <h3>Stay Informed</h3>
                            <p>Access videos and articles to understand risks, recognize signs, and learn about prevention.</p>
                        </Link>
                        <Link to="/get-help" className="card" data-aos="fade-up" data-aos-delay="300">
                            <span className="material-symbols-outlined">support_agent</span>
                            <h3>Connect with Help</h3>
                            <p>Find contact information for campus counselors, therapists, and national support helplines.</p>
                        </Link>
                    </div>
                </div>
            </section>

            <Testimonials />

            <Faq />
        </main>
    );
};

export default HomePage;

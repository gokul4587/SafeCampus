import React from 'react';

const GetHelp = () => {
    return (
        <main>
            <div className="container">
                <h1 className="page-title">Support & Counseling Contacts</h1>
                <div className="help-grid">
                    <div className="contact-card">
                        <h3>Dr. Anjali Sharma</h3>
                        <p className="role">Lead Campus Counselor</p>
                        <div className="contact-info">
                            <a href="tel:+910000000001">
                                <span className="material-symbols-outlined">call</span>
                                +91 000 000 0001
                            </a>
                            <a href="mailto:a.sharma@university.edu">
                                <span className="material-symbols-outlined">mail</span>
                                a.sharma@university.edu
                            </a>
                        </div>
                    </div>

                    <div className="contact-card">
                        <h3>Mr. Rohan Verma</h3>
                        <p className="role">Student Wellness Advisor</p>
                        <div className="contact-info">
                            <a href="tel:+910000000002">
                                <span className="material-symbols-outlined">call</span>
                                +91 000 000 0002
                            </a>
                            <a href="mailto:r.verma@university.edu">
                                <span className="material-symbols-outlined">mail</span>
                                r.verma@university.edu
                            </a>
                        </div>
                    </div>

                    <div className="contact-card">
                        <h3>National Drug De-addiction Helpline</h3>
                        <p className="role">24/7 Toll-Free Support</p>
                        <div className="contact-info">
                            <a href="tel:1800-11-0031">
                                <span className="material-symbols-outlined">call</span>
                                1800-11-0031
                            </a>
                             <a href="mailto:helpline@example.gov">
                                <span className="material-symbols-outlined">mail</span>
                                info@helpline.gov
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default GetHelp;

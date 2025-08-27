import React from 'react';

const Report = () => {
    return (
        <main>
            <div className="container">
                <h1 className="page-title">Anonymous Reporting Form</h1>

                <div className="disclaimer">
                    <strong>Emergency Disclaimer:</strong> If you are witnessing a medical emergency or a crime in progress, please call your local emergency services (e.g., 100 or 112) or campus security immediately. This form is for non-urgent reporting.
                </div>

                <div className="form-container">
                    <p style={{textAlign: 'center', marginBottom: '20px'}}>Your report is submitted through a secure and anonymous service. We do not collect your IP address or any identifying information.</p>
                    
                    <iframe 
                        src="" 
                        width="100%" 
                        height="600" 
                        frameBorder="0" 
                        marginHeight="0" 
                        marginWidth="0"
                        style={{border:'1px solid #ccc', borderRadius: '8px', background: '#fdfdfd'}}
                        >
                        Loading…
                    </iframe>
                    <p style={{textAlign: 'center', fontSize: '0.9em', color: '#5f6368', marginTop: '15px'}}>
                        Note: This is an iframe placeholder. Replace the 'src' attribute with the embed link from your form provider.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Report;

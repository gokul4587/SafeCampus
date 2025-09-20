import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../components/Report.css';

const AnonymousTipPage = () => {
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*,video/*' });

    const handleRemoveFile = (fileName) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <main className="report-page">
            <div className="container">
                <div className="report-header-section">
                    <h1>Report an Incident</h1>
                    <p>Your safety is our priority. Use this form to anonymously report any incidents or concerns. All submissions are secure and confidential.</p>
                </div>

                <div className="report-card">
                    <div className="emergency-disclaimer">
                        <span className="material-symbols-outlined">emergency</span>
                        <div>
                            <h3>In an Emergency?</h3>
                            <p>If this is a life-threatening situation, please call 911 or your local emergency services immediately.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h2>New Report</h2>
                        <div className="form-group">
                            <label htmlFor="description">Detailed Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Please provide as much detail as possible..."
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Attach Evidence (Optional)</label>
                            <div {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}>
                                <input {...getInputProps()} />
                                <span className="material-symbols-outlined">cloud_upload</span>
                                <p>{isDragActive ? 'Drop files here to upload' : 'Drag & drop files, or click to select'}</p>
                            </div>
                            {files.length > 0 && (
                                <div className="file-previews">
                                    {files.map(file => (
                                        <div key={file.name} className="file-preview">
                                            <img src={file.preview} alt="preview" />
                                            <button type="button" onClick={() => handleRemoveFile(file.name)} className="remove-file-btn">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn" disabled={!description.trim()}>
                            Submit Secure Report
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AnonymousTipPage;

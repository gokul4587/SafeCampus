import React, { useState } from 'react';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch('/resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                url: url,
                thumbnail_url: thumbnailUrl,
            })
        });
        if (response.ok) {
            // Handle success
            console.log('Resource created successfully');
        } else {
            // Handle error
            console.error('Failed to create resource');
        }
    };

    return (
        <main>
            <div className="container">
                <h1 className="page-title">Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="thumbnailUrl">Thumbnail URL</label>
                        <input
                            type="text"
                            id="thumbnailUrl"
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                        />
                    </div>
                    <button type="submit">Add Resource</button>
                </form>
            </div>
        </main>
    );
};

export default Admin;

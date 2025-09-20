import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <h1>Welcome, {user?.name || 'Admin'}</h1>
            <p>This is the admin dashboard. Here you can manage reports, users, and site content.</p>
            <button onClick={logout} className="btn btn-primary">Logout</button>
        </main>
    );
};

export default AdminDashboard;

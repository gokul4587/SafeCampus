import React from 'react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <h1>Welcome, {user?.name || 'Student'}</h1>
            <p>This is your dashboard. You can view your submitted reports, track their status, and access exclusive resources.</p>
            <button onClick={logout} className="btn btn-primary">Logout</button>
        </main>
    );
};

export default StudentDashboard;

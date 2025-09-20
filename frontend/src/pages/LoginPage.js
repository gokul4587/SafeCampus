import React from 'react';
import Login from '../components/Login';
import '../Login.css';

const LoginPage = () => {
  return (
    <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
        <Login />
    </main>
  );
};

export default LoginPage;
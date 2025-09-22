import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/inventory" style={{ marginRight: 10 }}>Inventory</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </AuthProvider>
  );
}

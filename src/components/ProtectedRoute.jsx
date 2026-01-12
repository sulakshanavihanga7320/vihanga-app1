import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Simple mock authentication check
    // In a real app, this would check a token or context
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

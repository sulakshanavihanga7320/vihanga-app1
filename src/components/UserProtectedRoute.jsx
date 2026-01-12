import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
    const isUserAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';

    if (!isUserAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default UserProtectedRoute;

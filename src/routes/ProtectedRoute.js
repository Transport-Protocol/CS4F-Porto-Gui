// src/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../login/AuthContext';

const ProtectedComponent = () => {
    return <div>Willkommen, du bist eingeloggt!</div>;
};

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    return user ? <ProtectedComponent /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { loggedInUser } = useUserAuth();
    return loggedInUser ? children : <Navigate to='/login' />
}

export default ProtectedRoute;
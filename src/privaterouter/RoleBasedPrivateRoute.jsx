import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/home/component/Home';

const RoleBasedPrivateRoute = () => {
    const role = localStorage.getItem('role');
    
    return role === "Developer" ? <Outlet /> : <Navigate to={"/home"} />
}

export default RoleBasedPrivateRoute;
import { StrictMode, useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to our Dashboard!</p>

            <button type="button" className="btn btn-light">
                <NavLink 
                  to="overview" 
                 >
                   Overview
                </NavLink>
            </button>

            <button type="button" className="btn btn-light">
                <NavLink 
                  to="status" 
                 >
                   Status
                </NavLink>
            </button>
            <Outlet />
        </div>
    )
}
export default Dashboard
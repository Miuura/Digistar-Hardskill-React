import App from './App.jsx'
import './index.css'

import { StrictMode, useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Overview from './pages/Overview.jsx'
import Status from './pages/Status.jsx'
import User from './pages/User.jsx'
import UserDetail from './pages/UserDetail.jsx';

const AuthContext = createContext();

function Navbar() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);

  return (
    <>
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Contact
            </NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/user" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  User Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <button type="button" onClick={toggleAuth} className="btn btn-link">
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </header>
      <Outlet />
    </>
  );
}

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,  
    children: [
      {
        path: "*",  
        element: <PageNotFound />
      },
      {
        path: "/",  
        element: <Home />
      },
      {
        path: "about",  
        element: <About />
      },
      {
        path: "contact", 
        element: <Contact />
      },
      {
        path: "dashboard",  
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "overview",
            element: <Overview />
          },
          {
            path: "status",
            element: <Status />
          }
        ]
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
        // children: [
        //   {
        //     path: "details/:userId",
        //     element: <UserDetail />
        //   }
        // ]
      },
      {
        path: "user/details/:userId",
        element: (
          <ProtectedRoute>
            <UserDetail />
          </ProtectedRoute>
        ),
      }
    ]
  }
]);

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <p>Access denied. Please log in to view this page.</p>;
  }

  return children;
}

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

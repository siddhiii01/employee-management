import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import React from 'react';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({children}) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } catch (e) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
}
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element = {
            <Login />
          }
        />
        <Route 
          path="/dashboard"
          element= {
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path="*"
          element={
            <Navigate to="/login" />
          }
        />
      </Routes>
    
    </BrowserRouter>
  )
}



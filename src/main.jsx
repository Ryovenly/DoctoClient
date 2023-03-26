import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Login from "./Login";
import Profile from "./Profile";
import Doctor from "./Doctor";

import { AuthContextProvider } from './AuthContext';
//import { AuthProvider } from "./AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route
                      path='/profile'
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
            />
            <Route
                      path='/doctor'
                      element={
                        <ProtectedRoute>
                          <Doctor />
                        </ProtectedRoute>
                      }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </React.StrictMode>,
)
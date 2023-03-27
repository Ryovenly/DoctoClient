import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Login from "./Login";
import Profile from "./Profile";
import Doctor from "./Doctor";
import AppointmentSelect from "./AppointmentSelect";


import { AuthContextProvider } from './AuthContext';
//import { AuthProvider } from "./AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NoInternetConnection from './NoInternetConnection';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
        <NoInternetConnection>
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
            <Route
                      path='/appointmentSelect'
                      element={
                        <ProtectedRoute>
                          <AppointmentSelect />
                        </ProtectedRoute>
                      }
            />
          </Routes>
        </NoInternetConnection>
        </AuthContextProvider>
      </BrowserRouter>
    </React.StrictMode>,
)
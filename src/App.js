import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './login/AuthContext';
import { GoogleLogin } from './login/GoogleLogin';
import OAuth2Callback from './login/OAuth2Callback';
import MainNavbar from './navbar/MainNavbar';
import LoginNavbar from "./navbar/LoginNavbar";
import ProtectedRoute from './routes/ProtectedRoute';
import logo from './material/cs4f-logo.png';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

const AppContent = () => {
    const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState('en');
    const userRole = 'admin';

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <div className="App">
            <div className="App-navbar">
                {user ? (
                    <MainNavbar userRole={userRole} /> // Zeige MainNavbar wenn eingeloggt
                ) : (
                    <LoginNavbar /> // Zeige LoginNavbar wenn nicht eingeloggt
                )}
            </div>

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <br/>
                <Router>
                    <Routes>
                        <Route path="/login" element={<GoogleLogin />} />
                        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
                        <Route path="/" element={<ProtectedRoute />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
};

export default App;

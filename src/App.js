import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './login/AuthContext';
import { GoogleLogin } from './login/GoogleLogin';
import OAuth2Callback from './login/OAuth2Callback';
import MainNavbar from './navbar/MainNavbar';
import LoginNavbar from "./navbar/LoginNavbar";
import { LanguageProvider } from './context/LanguageContext';
import logo from './material/cs4f-logo.png';
import './App.css';

// Protected Routes
import ProtectedRouteLogin from "./routes/ProtectedRouteLogin";
import ProtectedRouteUserMasterData from "./routes/ProtectedRouteUserMasterData";
import ProtectedDefaultRoute from "./routes/ProtectedDefaultRoute";

function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <Router>
                    <AppContent />
                </Router>
            </LanguageProvider>
        </AuthProvider>
    );
}

const AppContent = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();  // Jetzt korrekt innerhalb eines Router-Kontexts verwendet
    const userRole = 'admin';  // Placeholder für Benutzerrolle

    return (
        <div className="App">
            <div className="App-navbar">
                {user ? (
                    <MainNavbar userRole={userRole}/>
                    ) : (
                    <LoginNavbar />
                    )}
            </div>

            <header className="App-header">
                {/* Logo nur anzeigen, wenn der Pfad nicht /user/master_data ist */}
                {location.pathname !== '/user/master_data' && (
                    <img src={logo} className="App-logo" alt="logo"/>
                )}

                {/* Routes definieren */}
                <Routes>
                    <Route path="/login" element={<GoogleLogin/>}/>
                    <Route path="/oauth2/callback" element={<OAuth2Callback/>}/>
                    <Route path="/" element={<ProtectedRouteLogin/>}/>
                    <Route path="/user/master_data" element={<ProtectedRouteUserMasterData/>}/>

                    {/* Default Route */}
                    <Route path="*" element={<ProtectedDefaultRoute />} />
                </Routes>
            </header>
        </div>
    );
};

export default App;

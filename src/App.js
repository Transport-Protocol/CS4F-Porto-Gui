import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './login/AuthContext';
import { GoogleLogin } from './login/GoogleLogin';
import OAuth2Callback from './login/OAuth2Callback';
import MainNavbar from './navbar/MainNavbar';
import LoginNavbar from "./navbar/LoginNavbar";
import ProtectedRoute from './routes/ProtectedRoute';
import { LanguageProvider } from './context/LanguageContext'; // Importiere den LanguageProvider
import logo from './material/cs4f-logo.png';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <LanguageProvider> {/* Umwickle die App mit dem LanguageProvider */}
                <AppContent />
            </LanguageProvider>
        </AuthProvider>
    );
}

const AppContent = () => {
    const { user } = useContext(AuthContext);
    const userRole = 'admin'; // TODO userRole should be a database thing

    return (
        <div className="App">
            <Router>
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

                    <Routes>
                        <Route path="/login" element={<GoogleLogin />} />
                        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
                        <Route path="/" element={<ProtectedRoute />} />
                    </Routes>

                </header>
            </Router>
        </div>
    );
};

export default App;

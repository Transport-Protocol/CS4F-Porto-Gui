import  React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './session/login/AuthContext';
import { LoginProvider } from './session/login/LoginProvider';
import OAuth2Callback from './session/login/OAuth2Callback';
import MainNavbar from './navbar/MainNavbar';
import LoginNavbar from "./navbar/LoginNavbar";
import { LanguageProvider } from './session/context/LanguageContext';
import logo from './_assets/cs4f-logo.png';
import './App.css';

// Protected Routes
import ProtectedRouteLogin from "./routes/login/ProtectedRouteLogin";
import ProtectedRouteUserTransactionRecord from "./routes/user/transaction_records/ProtectedRouteUserTransactionRecord";
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
                {location.pathname === '/login' && (
                    <img src={logo} className="App-logo" alt="logo"/>
                )}

                {/* Routes definieren */}
                <Routes>
                    <Route path="/" element={<ProtectedRouteLogin/>}/>

                    {/* Routes for /login */}
                    <Route path="/login" element={<LoginProvider/>}/>
                    <Route path="/oauth2/callback" element={<OAuth2Callback/>}/>

                    {/* (Protected) Routes for /user */}
                    <Route path="/user/transaction_records" element={<ProtectedRouteUserTransactionRecord/>}/>

                    {/* Default Route */}
                    <Route path="*" element={<ProtectedDefaultRoute />} />
                </Routes>
            </header>
        </div>
    );
};

export default App;

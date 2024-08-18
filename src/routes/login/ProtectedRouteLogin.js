import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../login/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';  // Importiere den LanguageContext

const translations = {
    de: {
        welcome_text: 'Willkommen {user}, du bist eingeloggt!',
    },
    en: {
        welcome_text: 'Welcome {user}, you are logged in!',
    },
};

const ProtectedComponent = () => {
    const { language } = useContext(LanguageContext);  // Verwende den LanguageContext
    const { user } = useContext(AuthContext);  // Greife auf den Benutzer aus AuthContext zu

    const t = translations[language];

    // Ersetze den Platzhalter {user} im Begrüßungstext durch den Benutzernamen
    return <div> <br/> {t.welcome_text.replace('{user}', user?.name || 'Guest')}</div>;
};

const ProtectedRouteLogin = () => {
    const { user } = useContext(AuthContext);
    return user ? <ProtectedComponent /> : <Navigate to="/login" replace />;
};

export default ProtectedRouteLogin;

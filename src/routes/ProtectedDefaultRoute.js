import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../login/AuthContext';
import { LanguageContext } from '../context/LanguageContext';  // Importiere den LanguageContext

const translations = {
    de: {
        not_found_text: 'Die angeforderte Ressource ist nicht erreichbar.',

    },
    en: {
        not_found_text: 'The requested resource is not reachable.',
    },
};

const NotFoundComponent = () => {
    const { language } = useContext(LanguageContext);  // Verwende den LanguageContext
    const t = translations[language];

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>{t.not_found_text}</h2>
        </div>
    );
};

const ProtectedDefaultRoute = () => {
    const { user } = useContext(AuthContext);
    if (user === null) {
        // Wenn der Benutzerzustand noch geladen wird
        return <div>Loading...</div>;
    }
    // Wenn der Benutzer authentifiziert ist, zeige die NotFoundComponent an
    // Andernfalls leite zur Login-Seite um
    return user ? <NotFoundComponent /> : <Navigate to="/login" replace />;
};

export default ProtectedDefaultRoute;

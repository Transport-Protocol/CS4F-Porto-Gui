import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../login/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import UserTransactionRecords from '../../data-components/user/user-transaction-record';  // Schreibfehler korrigiert

const translations = {
    de: {
        master_data_set: 'Stammdaten!',
    },
    en: {
        master_data_set: 'User Master Dataset!',
    },
};

const ProtectedComponent = () => {
    const { language } = useContext(LanguageContext);
    console.log("Render User Master Data Set" + translations[language].master_data_set);
    return (
        <div>
            <UserTransactionRecords />  {/* Korrigierter Verweis auf die Komponente */}
        </div>
    );
};

const ProtectedRouteUserTransactionRecord = () => {
    const { user } = useContext(AuthContext);
    console.log('Current user:', user);
    if (user === null) {
        // Wenn der Benutzerzustand noch geladen wird
        return <div>Loading...</div>;
    }
    return user ? <ProtectedComponent /> : <Navigate to="/login" replace />;  // Anpassen der Umleitung
};

export default ProtectedRouteUserTransactionRecord;

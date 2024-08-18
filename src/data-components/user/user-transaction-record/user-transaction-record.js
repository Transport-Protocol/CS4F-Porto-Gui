import React, { useEffect, useState, useContext } from 'react';
import './user-transaction-record.css';  // CSS-Datei importieren
import { fetchData } from '../../../connector/cs4f-proto-core-api/core-api';
import { LanguageContext } from '../../../session/context/LanguageContext';  // Annehmen, dass ein LanguageContext existiert

const UserTransactionRecords = () => {
    const [translations, setTranslations] = useState({});
    const [data, setData] = useState([]);
    const { language } = useContext(LanguageContext);  // Sprache aus dem Kontext holen

    useEffect(() => {
        const getData = async () => {
            try {
                const { translations, data } = await fetchData();
                setTranslations(translations);
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, []);

    const renderTableHeader = () => {
        if (!data || data.length === 0) return null;

        const headers = Object.keys(data[0]);  // Nutzt die Schlüssel des ersten Objekts als Header
        return (
            <tr>
                {headers.map((key, index) => (
                    <th key={index}>{translations[key][language]}</th>
                    ))}
            </tr>
        );
    };

    const renderTableData = () => {
        return data.map((item, index) => (
            <tr key={index}>
                {Object.values(item).map((value, idx) => (
                    <td key={idx}>{value}</td>
                ))}
            </tr>
        ));
    };

    return (
        <div className="user_master_data_show">
            <div className="user_master_data_show_title">
                {language === 'de' ? 'Transaktionen' : 'Transaction records'}
            </div>
            <table>
                <thead>
                {renderTableHeader()}
                </thead>
                <tbody>
                {renderTableData()}
                </tbody>
            </table>
        </div>
    );
};

export default UserTransactionRecords;

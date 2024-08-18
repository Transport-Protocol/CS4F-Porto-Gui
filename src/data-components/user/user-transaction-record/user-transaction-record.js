import React, { useEffect, useState, useContext } from 'react';
import './user-transaction-record.css';

import { fetchData } from '../../../connector/cs4f-proto-core-api/core-api';
import { LanguageContext } from '../../../session/context/LanguageContext';

const UserTransactionRecords = () => {
    const [translations, setTranslations] = useState({});
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);  // Zustand für die Sichtbarkeit der Filter
    const { language } = useContext(LanguageContext);

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

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value.toLowerCase() }));
    };

    const renderTableHeader = () => {
        if (!data || data.length === 0) return null;
        const headers = Object.keys(data[0]);
        return (
            <tr>
                {headers.map((key, index) => (
                    <th key={index}>
                        {translations[key][language]}
                        {showFilters && (
                            <input
                                type="text"
                                placeholder={`Filter by ${translations[key][language]}`}
                                onChange={(e) => handleFilterChange(key, e.target.value)}
                                style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                            />
                        )}
                    </th>
                ))}
            </tr>
        );
    };

    const renderTableData = () => {
        return data.filter(item =>
            Object.keys(filters).every(key =>
                item[key].toString().toLowerCase().includes(filters[key])
            )
        ).map((item, index) => (
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
                <button onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
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
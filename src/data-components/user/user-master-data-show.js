import React, { useEffect, useState } from 'react';
import { fetchData } from '../../cs4f-proto-core-api/core-api';
import './user-master-data-show.css';  // CSS-Datei importieren

const UserMasterDataSet = () => {
    const [data, setData] = useState(null);
    console.log("UserMasterDataSet");

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, []);

    // Funktion, um den Header basierend auf den Daten zu erstellen
    const renderTableHeader = () => {
        if (!data || data.length === 0) return null;

        const headers = Object.keys(data[0]);  // Nimmt die Schlüssel des ersten Objekts als Header
        return (
            <tr>
                {headers.map((key, index) => (
                    <th key={index}>{key}</th>
                ))}
            </tr>
        );
    };

    // Funktion, um die Tabellenzeilen basierend auf den Daten zu erstellen
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
            {data ? (
                <table>
                    <thead>
                    {renderTableHeader()}
                    </thead>
                    <tbody>
                    {renderTableData()}
                    </tbody>
                </table>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default UserMasterDataSet;

// api.js
export const fetchData = async () => {
    try {
        // const response = await fetch('https://api.example.com/data');
        // const data = await response.json();
        const data = [
            {
                Matrikelnummer: "123456",
                Name: "Max Mustermann",
                Studiengang: "Informatik",
                Immatrikulationsjahr: 2020
            },
            {
                Matrikelnummer: "654321",
                Name: "Erika Musterfrau",
                Studiengang: "Maschinenbau",
                Immatrikulationsjahr: 2019
            },
            {
                Matrikelnummer: "112233",
                Name: "Hans Müller",
                Studiengang: "Wirtschaftswissenschaften",
                Immatrikulationsjahr: 2021
            },
            {
                Matrikelnummer: "445566",
                Name: "Anna Schmidt",
                Studiengang: "Elektrotechnik",
                Immatrikulationsjahr: 2018
            },
            {
                Matrikelnummer: "778899",
                Name: "Laura Becker",
                Studiengang: "Medizin",
                Immatrikulationsjahr: 2020
            }
        ];

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
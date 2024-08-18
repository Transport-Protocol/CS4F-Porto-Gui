// api.js
import SecureService from "./core-security";

export const fetchData = async () => {
    try {
        // const [data, setData] = useState(null);
        //
        // useEffect(() => {
        //     // Ressourcenpfad als Parameter
        //     SecureService.getSecureData('secure-data')
        //         .then(data => {
        //             setData(data);
        //         })
        //         .catch(error => {
        //             console.error('Failed to fetch data:', error);
        //         });
        // }, []);

        const translations = {
            matrikelnummer: {
                de: "Matrikelnummer",
                en: "Registration Number"
            },
            name: {
                de: "Name",
                en: "Name"
            },
            studiengang: {
                de: "Studiengang",
                en: "Study Program"
            },
            immatrikulationsjahr: {
                de: "Immatrikulationsjahr",
                en: "Year of Enrollment"
            }
        };

        const data = [
            {
                matrikelnummer: "123456",
                name: "Max Mustermann",
                studiengang: "Informatik",
                immatrikulationsjahr: 2020
            },
            {
                matrikelnummer: "654321",
                name: "Erika Musterfrau",
                studiengang: "Maschinenbau",
                immatrikulationsjahr: 2019
            },
            {
                matrikelnummer: "112233",
                name: "Hans Müller",
                studiengang: "Wirtschaftswissenschaften",
                immatrikulationsjahr: 2021
            },
            {
                matrikelnummer: "445566",
                name: "Anna Schmidt",
                studiengang: "Elektrotechnik",
                immatrikulationsjahr: 2018
            },
            {
                matrikelnummer: "778899",
                name: "Laura Becker",
                studiengang: "Medizin",
                immatrikulationsjahr: 2020
            }
        ];

        return { translations, data };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
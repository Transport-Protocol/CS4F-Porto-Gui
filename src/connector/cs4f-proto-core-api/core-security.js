import axios from 'axios';

// Konfiguration von Axios mit Basis-URL und Token
const api = axios.create({
    baseURL: 'https://example.com/api',
    timeout: 1000,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
});

// Logging der Anfragen und Antworten
api.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

api.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

// Funktion zur Abfrage sicherer Daten mit dynamischem Ressourcenpfad
const SecureService = {
    getSecureData: async (resourcePath) => {
        try {
            const response = await api.get(`/${resourcePath}`); // Dynamischer Pfad
            return response.data;
        } catch (error) {
            console.error('Error while fetching secure data', error);
            throw error;
        }
    }
};

export default SecureService;
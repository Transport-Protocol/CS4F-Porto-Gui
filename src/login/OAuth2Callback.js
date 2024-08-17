// src/login/OAuth2Callback.js

import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const CLIENT_ID = '338927639565-c4hmo0pi1vqvqkot1cl8hk90vhga07br.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:3000/oauth2/callback';

const OAuth2Callback = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (code) => {
            try {
                const response = await axios.post('https://oauth2.googleapis.com/token', {
                    client_id: CLIENT_ID,
                    client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: REDIRECT_URI,
                });

                const { access_token } = response.data;

                const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                login(userResponse.data);
                navigate('/'); // Nach erfolgreichem Login weiterleiten
            } catch (error) {
                console.error('Login error:', error);
            }
        };

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            fetchData(code);
        }
    }, [login, navigate]);

    return <div>Login wird verarbeitet...</div>;
};

export default OAuth2Callback;

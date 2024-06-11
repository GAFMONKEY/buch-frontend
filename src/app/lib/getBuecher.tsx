'use server'

import axios from 'axios';
import { agent } from './httpsAgent';

const restURL = 'https://localhost:3000/rest';

export default async function getBuecher(suchkriterien: string) {
    try {
        const response = await axios.get(`${restURL}/?${suchkriterien}`, {
            httpsAgent: agent,
        });
        return response.data._embedded?.buecher ?? [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response.status;
            } else if (error.request) {
                console.log('Server:', error.request);
                return 500;
            }
        }
        console.log('Error:', (error as Error).message);
        return;
    }
}
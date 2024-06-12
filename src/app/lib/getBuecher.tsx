'use server'

import axios, { AxiosResponse } from 'axios';
import { httpsAgent } from './httpsAgent';

const baseURL = 'https://localhost:3000/rest';

export const getBooks = async (searchParams: string): Promise<Buch[] | number> => {
    try {
        const response: AxiosResponse<Buecher> = await axios.get(`${baseURL}/?${searchParams}`, { httpsAgent });
        return response.data._embedded?.buecher ?? [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response.status;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('Server:', error.request);
                return 500;
            }
        }            
        console.log('Error:', error);
        return -1;
    }
}
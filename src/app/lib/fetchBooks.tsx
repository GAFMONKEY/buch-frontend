'use server'

import axios, { AxiosError, AxiosResponse } from 'axios';
import { httpsAgent } from './httpsAgent';

const baseURL = 'https://localhost:3000/rest';

export const fetchBooks = async (searchParams: string) => {
    try {
        const response: AxiosResponse<Buecher> = await axios.get(`${baseURL}/?${searchParams}`, { httpsAgent });
        console.log(response);
        return response.data._embedded?.buecher ?? [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            if (axiosError.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(axiosError.response.data);
                console.log(axiosError.response.status);
                console.log(axiosError.response.headers);
                return axiosError.response.status;
            } else if (axiosError.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('Server:', axiosError.request);
                return 500;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error:', axiosError.message);
                return -1;
            }
        } else {
            // Handle non-Axios errors
            console.log('Non-Axios Error:', error);
            return -1;
        }
    }
}
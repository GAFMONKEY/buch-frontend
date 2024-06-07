'use server'

import axios from 'axios';
import { agent } from './httpsAgent';

const restURL = 'https://localhost:3000/rest';

export default async function getBuecher(suchkriterien: string) {
    return await axios.get(`${restURL}/?${suchkriterien}`, {
      httpsAgent: agent,
    })
    .then(function (response) {
        return response.data._embedded?.buecher ?? [];
    })
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return error.response.status;
        } else if (error.request) {
            // The request was made but no response was received
            console.log('Server:', error.request);
            return 500;
        } else {
            // The request was not made, something in setting up the request triggered an Error
            console.log('Error:', error.message);
            return;
        }
    })
}
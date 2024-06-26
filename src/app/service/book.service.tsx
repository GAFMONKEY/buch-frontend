'use server';
import axios, { AxiosResponse } from 'axios';
import { httpsAgent } from '../lib/utils/httpsAgent';
import { AxiosError } from 'axios';

const baseURL = 'https://localhost:3000/rest';

export const getBooks = async (
    searchParams: string,
): Promise<Buch[] | number> => {
    try {
        const response: AxiosResponse<Buecher> = await axios.get(
            `${baseURL}/?${searchParams}`,
            { httpsAgent },
        );
        return response.data._embedded?.buecher ?? [];
    } catch (error) {
        const status = handleRequestErrors(error);
        return status;
    }
};

export async function postBuch(objektDaten: object, tokenDatei: string) {
    try {
        const response: AxiosResponse<Buecher> = await axios.post(
            `${baseURL}`,
            objektDaten,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenDatei}`,
                },
                httpsAgent,
            },
        );
        console.log(response.status);
        const status = response.status;
        const selfLink = response.headers['location'];
        return { status, selfLink };
    } catch (error) {
        const status = handleRequestErrors(error);
        return { status };
    }
}

export async function putBuch(
    objektDaten: object,
    tokenDatei: string,
    id: string,
    eTag: string,
) {
    try {
        const response = await axios.put(`${baseURL}/${id}`, objektDaten, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenDatei}`,
                'If-Match': eTag,
            },
            httpsAgent,
        });
        console.log('PUT Response:', response);
        return { status: response.status };
    } catch (error) {
        if (isPreconditionFailedError(error)) {
            try {
                const currentBook = await fetchBookDetailsWithETag(id);
                const eTag = currentBook.eTag;

                const retryResponse = await axios.put(
                    `${baseURL}/${id}`,
                    objektDaten,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${tokenDatei}`,
                            'If-Match': eTag,
                        },
                        httpsAgent,
                    },
                );
                console.log('Retry PUT Response:', retryResponse);
                return { status: retryResponse.status };
            } catch (err) {
                console.error('Fehler beim erneuten PUT-Anfrage:', err);
                throw err;
            }
        } else {
            console.error('Fehler beim PUT-Anfrage:', error);
            throw error;
        }
    }
}

export const fetchBookDetails = async (id: string) => {
    try {
        const response = await axios.get(`https://localhost:3000/rest/${id}`, {
            httpsAgent,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch book details:', error);
        return null;
    }
};

export const fetchBookDetailsWithETag = async (id: string) => {
    try {
        const response = await axios.get(`${baseURL}/${id}`, {
            httpsAgent,
            headers: {
                Accept: 'application/json',
            },
        });
        const data = response.data;
        const eTag = response.headers['etag'];
        return { ...data, eTag };
    } catch (error) {
        console.error('Failed to fetch book details with ETag:', error);
        return null;
    }
};

function isPreconditionFailedError(error: any): error is AxiosError {
    return error.response?.status === 412;
}

const handleRequestErrors = (error: any) => {
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
    console.log('Error:', error);
    return -1;
};

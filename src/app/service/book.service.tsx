'use server';
import axios, { AxiosResponse } from 'axios';
import { httpsAgent } from '../lib/httpsAgent';

const serverUrl = 'https://localhost:3000';

const handleRequestErrors = (error: any) => {
  console.log('Error!!!!!!!!!!!!!!!!!!!!!!!');
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // console.log(error.response.data);
             console.log(error.response.status);
            // console.log(error.response.headers);
            return error.response.status;
        } else if (error.request) {
            console.log('Server:', error.request);
            return 500;
        }
    }            
    console.log('Error');
    return -1;
}

export async function fetchBooks(searchParams: string) {
  try {
    const response: AxiosResponse<Buecher> = await axios.get(`${serverUrl}/?${searchParams}`, {
      httpsAgent, 
    });
    console.log(response.status);
    return response.data._embedded?.buecher ?? [];
  } catch (error) {
    return handleRequestErrors(error);
  }
}

export async function postBuch(objektDaten: object, tokenDatei: string) {
  try {
    const response: AxiosResponse<Buecher> = await axios.post(`${serverUrl}/rest`, objektDaten, {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${tokenDatei}`,
      }, 
      httpsAgent,
    });
    console.log(response.status);
    const status = response.status;
    const selfLink = response.headers['location'];
    return { status, selfLink };
  } catch (error) {
    const status = handleRequestErrors(error);
    return { status };
  }
}

export async function putBuch(objektDaten: object, tokenDatei: string, id: string, eTag: string) {
  try {
    const response: AxiosResponse<Buecher> = await axios.put(`${serverUrl}/rest/${id}`, objektDaten, {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${tokenDatei}`,
        'If-Match': eTag
      },
      httpsAgent,
    });
    console.log(response.status);
    const status = response.status;
    return { status };
  } catch (error) {
    const status = handleRequestErrors(error);
    return { status };
  }
}

export const fetchBookDetails = async (id: string) => {
  const response = await axios.get(`https://localhost:3000/rest/${id}`, {
    httpsAgent,
  });
  if (response.status != 200) {
    alert('Fehler beim Laden des Buches');
    return;
  }
  const eTag = response.headers['etag'];
  const body = await response.data;
  return { body, eTag };
};
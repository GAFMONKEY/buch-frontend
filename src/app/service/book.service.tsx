'use server';
import axios, { AxiosResponse } from 'axios';
import { httpsAgent } from '../lib/utils/httpsAgent';

const baseURL = 'https://localhost:3000/rest';

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
          ContentType: 'application/json',
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
    const response: AxiosResponse<Buecher> = await axios.put(
      `${baseURL}/${id}`,
      objektDaten,
      {
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${tokenDatei}`,
          'If-Match': eTag,
        },
        httpsAgent,
      },
    );
    console.log(response.status);
    const status = response.status;
    return { status };
  } catch (error) {
    const status = handleRequestErrors(error);
    return { status };
  }
}

export const fetchBookDetails = async (id: string) => {
  const response = await axios.get(`${baseURL}/${id}`, {
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

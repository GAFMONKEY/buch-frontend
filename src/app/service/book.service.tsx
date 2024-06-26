'use server';
import axios, { AxiosResponse } from 'axios';
import { httpsAgent } from '../lib/utils/httpsAgent';

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
    console.error('Error fetching books:', error);
    return -1;
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
    console.error('Error posting book:', error);
    return { status: -1 };
  }
}

export async function putBuch(objektDaten: object, tokenDatei: string, id: string, eTag: string) {
  try {
    const response = await axios.put(`${baseURL}/${id}`, objektDaten, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenDatei}`,
        'If-Match': eTag,
      },
      httpsAgent,
    });
    console.log('PUT Response:', response);
    return { status: response.status };
  } catch (error) {
    console.error('Error putting book:', error);
    return { status: -1 };
  }
}

export const fetchBookDetails = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`, {
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch book details:', error);
    return null;
  }
}

export const fetchBookDetailsWithETag = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`, {
      httpsAgent,
      headers: {
        'Accept': 'application/json',
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

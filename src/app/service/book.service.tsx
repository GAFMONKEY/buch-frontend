'use server';
import axios from 'axios';
import https from 'node:https';
import fs from 'node:fs';

export async function fetchBuch(suchkriterien: string) {
  return await axios
    .get(`https://localhost:3000/rest/?${suchkriterien}`, {
      httpsAgent: new https.Agent({
        ca: fs.readFileSync('src/app/certificate/certificate.crt'),
      }),
    })
    .then(function (response) {
      return response.data;
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
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('Server', error.request);
        return 500;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return;
      }
    });
}

export async function postBuch(objektDaten: object, tokenDatei: string) {
  const serverUrl = 'https://localhost:3000';

  return await axios
    .post(`${serverUrl}/rest`, objektDaten, {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${tokenDatei}`,
      },
      httpsAgent: new https.Agent({
        ca: fs.readFileSync('src/app/certificate/certificate.crt'),
      }),
    })
    .then(function (response) {
      console.log('Server response:', response.status);
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // error.request is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return 500;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return;
      }
    });
}

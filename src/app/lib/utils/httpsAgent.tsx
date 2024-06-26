import fs from 'node:fs';
import https from 'https';

export const httpsAgent = new https.Agent({
  ca: fs.readFileSync('src/app/certificate/certificate.crt'),
});

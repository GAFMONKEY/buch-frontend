import fs from 'fs';
import https from 'https';

export const agent = new https.Agent({
    ca: fs.readFileSync('src/app/certificate/certificate.crt'),
});
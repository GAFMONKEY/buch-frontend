'use server'
// Set the environment variable to ignore self-signed certificates
// Don't do this in production!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const restURL = 'https://localhost:3000/rest';

export default async function getBuecher(suchkriterien: string) {
    const res = await fetch(`${restURL}/?${suchkriterien}`);

    if (!res.ok) throw new Error('Daten konnten nicht geladen werden.');

    const data = await res.json();

    // Ensure the data is in the expected format Buch[]
    if (data && data._embedded && data._embedded.buecher) {
        return data._embedded.buecher;
    } else {
        throw new Error('Unerwartetes Datenformat.');
    }
}
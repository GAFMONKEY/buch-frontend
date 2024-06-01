'use server'
// Set the environment variable to ignore self-signed certificates
// Don't do this in production!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const authURL = 'https://localhost:3000/auth/login';

export default async function login(username: string, password: string) {
    const res = await fetch(authURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
        });
    
        return res.ok;
}
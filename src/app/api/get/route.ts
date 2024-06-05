import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const backendResponse = await axios.post(`https://localhost:3000/rest/${id}`, 
      { username, password },
      { httpsAgent }
    );

    if (backendResponse.status === 200) {
      return NextResponse.json({ access_token: backendResponse.data.access_token });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to connect to the backend', details: error }, { status: 500 });
  }
}
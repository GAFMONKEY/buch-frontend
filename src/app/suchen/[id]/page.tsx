// src/app/suchen/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchDataById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/rest/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

const DynamicPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
        try {
            const result = await fetchDataById(id.toString()); // Convert id to string
            setData(result);
        } catch (err) { // Remove type annotation from catch clause variable

        } finally {
            setLoading(false);
        }
    };

    if (id) {
        getData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <h1>Dynamic Page for ID: {id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DynamicPage;

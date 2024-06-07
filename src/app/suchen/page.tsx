'use client'

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, SimpleGrid, Text } from "@chakra-ui/react";
import AdvancedSearch from "../components/AdvancedSearch";
import getBuecher from "../lib/getBuecher";
import { useSearchParams } from 'next/navigation';
import BookCard from '../components/BookCard';

export default function Suchen() {
  const [buecher, setBuecher] = useState<Buch[]>();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('searchParams:', searchParams);
    if (searchParams.toString().length > 0) {
      const fetchBuecher = async () => {
        const query = new URLSearchParams(searchParams as any).toString();
        const response: Buch[] | number = await getBuecher(query);
        console.log('Empfangene Bücher: ', response);

        if(typeof response === 'number') {
          if (response === 404) {
            setAlertMessage('Keine Bücher mit diesen Suchkriterien gefunden.');
            setBuecher([]);
          } else {
            setAlertMessage('Buch-API nicht erreichbar.');
            setBuecher([]);
          }
        } else {
          setAlertMessage(null);
          setBuecher(response);
        }
      };

      fetchBuecher();
    }
  }, [searchParams]);

  return (
    <Box p={4}>
      <AdvancedSearch />
      <Box width="fit-content" mb={4}>
        {alertMessage && (
          <Alert status="warning">
            <AlertIcon />
            {alertMessage}
          </Alert>
        )}
      </Box>
      <SimpleGrid spacing={10} p={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {buecher && buecher.length > 0 &&
          buecher.map(buch => (
            <BookCard buch={buch} key={buch.isbn}/>
          ))
        }
      </SimpleGrid>
    </Box>
  );
}

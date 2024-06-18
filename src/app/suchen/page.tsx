'use client';

import { Alert, AlertIcon, Box, SimpleGrid } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { AdvancedSearch } from '../components/AdvancedSearch';
import { BookCard } from '../components/BookCard';
import { getBooks } from '../lib/getBuecher';
import { useSearchParams } from 'next/navigation';
import { schlagwortColorMap } from '../lib/generateColors';

export default function Suchen() {
  const [buecher, setBuecher] = useState<Buch[]>();
  const [filteredBuecher, setFilteredBuecher] = useState<Buch[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [schlagwortMap, setSchlagwortMap] = useState<
    Map<string, string> | undefined
  >(undefined);

  const filterBooksBySchlagwort = useCallback(
    (schlagwort: string) => {
      const filtered = buecher?.filter(buch =>
        buch.schlagwoerter.includes(schlagwort)
      );
      setFilteredBuecher(filtered ? filtered : []);
    },
    [buecher]
  );

  useEffect(() => {
    console.log('searchParams:', searchParams);

    // Don't call API when navigating to the page
    if (searchParams.toString().length > 0) {
      const searchBooks = async () => {
        const query = new URLSearchParams(searchParams as any).toString();
        const response: Buch[] | number = await getBooks(query);
        if (typeof response === 'number') {
          if (response === 404) {
            setAlertMessage('Keine Bücher mit diesen Suchkriterien gefunden.');
          } else {
            setAlertMessage(
              'Der Server ist aktuell nicht erreichbar. Bitte versuchen Sie es später erneut.',
            );
          }
          setBuecher([]);
        } else {
          setAlertMessage(null);
          const colorMap: Map<string, string> = schlagwortColorMap(response);
          setSchlagwortMap(colorMap);
          setBuecher(response);
          setFilteredBuecher(response);
        }
      };

      searchBooks();
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
      <SimpleGrid
        spacing={10}
        p={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {filteredBuecher &&
          filteredBuecher.length > 0 &&
          filteredBuecher.map((buch) => (
            <BookCard
              buch={buch}
              key={buch.isbn}
              schlagwortMap={schlagwortMap}
              onSchlagwortClick={filterBooksBySchlagwort}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
}

'use client';

import { Alert, AlertIcon, Box, Button, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { AdvancedSearch } from '../components/AdvancedSearch';
import { BookCard } from '../components/BookCard';
import { getBooks } from '../service/book.service';
import { useSearchParams } from 'next/navigation';
import { schlagwortColorMap } from '../lib/generateColors';

export default function Suchen() {
  const [buecher, setBuecher] = useState<Buch[]>();
  const [filteredBuecher, setFilteredBuecher] = useState<Buch[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [schlagwortMap, setSchlagwortMap] = useState<
    Map<string, string> | undefined
  >(undefined);

  const filterBooksBySchlagwort = useCallback(
    (schlagwort: string) => {
      setCurrentFilter(schlagwort.toUpperCase());
      const filtered = buecher?.filter(buch =>
        buch.schlagwoerter.includes(schlagwort)
      );
      setFilteredBuecher(filtered ? filtered : []);
    },
    [buecher]
  );

  const clearFilter = () => {
    setCurrentFilter(null);
    setFilteredBuecher(buecher ? buecher : []);
  };

  useEffect(() => {
    console.log('searchParams:', searchParams);

    // Don't call API when navigating to the page
    if (searchParams.toString().length > 0) {
      clearFilter();
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
          setFilteredBuecher([]);
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
      {currentFilter && (
        <HStack mb={4}>
          <Text as="i">Aktueller Filter: <strong>{currentFilter}</strong>.</Text>
          <Button onClick={clearFilter} colorScheme="teal" variant="ghost">
            Filter entfernen
          </Button>
        </HStack>
      )}
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

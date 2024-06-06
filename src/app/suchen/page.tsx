'use client'

import { useEffect, useState } from 'react';
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import AdvancedSearch from "../components/AdvancedSearch";
import getBuecher from "../lib/getBuecher";
import { FaEye, FaStar } from "react-icons/fa6";
import { useRouter, useSearchParams } from 'next/navigation';
import extractId from '../lib/extractId';
import BookCard from '../components/BookCard';

export default function Suchen({
  searchParams
}: {
  searchParams: {
    titel: string;
  }
}) {
  const [buecher, setBuecher] = useState<Buch[]>([]);
  const suchkriterien = useSearchParams();

  useEffect(() => {
    const fetchBuecher = async () => {
      const query = new URLSearchParams(searchParams as any).toString();
      try {
        const buecherData: Buch[] = await getBuecher(query);
        console.log('Empfangene Bücher: ', buecherData);
        setBuecher(buecherData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Bücher: ', error);
        setBuecher([]);
      }
    };

    fetchBuecher();
  }, [searchParams]);

  return (
    <Box p={4}>
      <AdvancedSearch />
      <SimpleGrid spacing={10} p={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {buecher.length > 0 ? (
          buecher.map(buch => (
            <BookCard buch={buch} key={buch.isbn}/>
          ))
        ) : (
          <Text>Keine Bücher gefunden</Text>
        )}
      </SimpleGrid>
    </Box>
  );
}

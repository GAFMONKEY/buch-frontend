'use client';

import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Spacer,
  Stack,
  Tag,
  Image,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import extractId from '../lib/extractId';
import { useState } from 'react';
import { useEffect } from 'react';
import { StarRating } from './BookCard';

export const BookDetails = ({
  initialBook,
  id,
}: {
  initialBook: Buch;
  id: string;
}) => {
  const [book, setBook] = useState(initialBook);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Example of client-side fetching if needed (e.g., for refreshing data)
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://localhost:3000/rest/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };
    // Uncomment if you want to refetch on client side for any reason
    fetchBookDetails();
  }, [id]);

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      maxW="4xl"
      mx="auto"
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Box
          flex="1"
          mb={{ base: 4, md: 0 }}
          maxW={{ base: '100%', md: '300px' }}
        >
          <Image
            src={
              'https://www.macworld.com/wp-content/uploads/2023/01/learn_javascript_on_mac.jpg?quality=50&strip=all'
            }
            alt={book.titel.titel}
            boxSize={{ base: '100%', md: '300px' }}
            objectFit="contain"
            borderRadius="md"
            mx="auto"
          />
        </Box>
        <Spacer />
        <Box flex="2" pl={{ base: 0, md: 5 }}>
          <Heading fontSize="2xl" mb={2} color="teal.600">
            {book.titel.titel}{' '}
            {book.titel.untertitel == null || undefined
              ? `- ${book.titel.untertitel}`
              : ''}
          </Heading>
          <Box>
            <Text fontWeight="bold">ISBN:</Text> <Text>{book.isbn}</Text>
            <Text fontWeight="bold">Rating:</Text>{' '}
            <Text>
              <StarRating rating={book.rating} />
            </Text>
            <Text fontWeight="bold" paddingTop={2}>
              Art:
            </Text>{' '}
            <Text>{book.art}</Text>
            <Text fontWeight="bold">Preis:</Text>
            <Text>
              <Text as="s" mr={2} color="grey">
                {book.preis.toFixed(2)}€
              </Text>
              <Text as="span" color="red.500">
                {(book.preis * (1 - book.rabatt)).toFixed(2)}€
              </Text>
            </Text>
            <Text fontWeight="bold">Rabatt:</Text>
            <Text>{(book.rabatt * 100).toFixed(2)}%</Text>
            <Text fontWeight="bold">Lieferbar:</Text>
            <Text>{book.lieferbar ? 'Ja' : 'Nein'}</Text>
            <Text fontWeight="bold">Datum:</Text>
            <Text>{new Date(book.datum).toLocaleDateString()}</Text>
          </Box>
          <Link href={book.homepage} color="teal.500" isExternal>
            <Button colorScheme="teal" variant="outline" size="sm" mt={2}>
              Homepage
            </Button>
          </Link>
          <Stack direction="row" mt={4} wrap="wrap" spacing={2}>
            {book.schlagwoerter.map((schlagwort) => (
              <Tag key={schlagwort} colorScheme="teal" size="lg">
                {schlagwort}
              </Tag>
            ))}
          </Stack>
          <Button
            colorScheme="teal"
            marginTop={2}
            onClick={() =>
              router.push(`/suchen/${extractId(book._links.self.href)}/aendern`)
            }
          >
            Buch bearbeiten
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

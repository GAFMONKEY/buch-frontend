'use client';

import {
  Box,
  Heading,
  Text,
  Link,
  Badge,
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

const BookDetails = ({ book } : { book: Buch}) => {
  const router = useRouter();

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white" maxW="4xl" mx="auto">
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex="1" mb={{ base: 4, md: 0 }} maxW={{ base: '100%', md: '300px' }}>
          <Image
            src={'https://www.macworld.com/wp-content/uploads/2023/01/learn_javascript_on_mac.jpg?quality=50&strip=all'}
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
            {book.titel.titel} - {book.titel.untertitel}
          </Heading>
          <VStack align="start" spacing={2} mb={4}>
            <Text><strong>ISBN:</strong> {book.isbn}</Text>
            <Text><strong>Rating:</strong> {book.rating}</Text>
            <Text><strong>Art:</strong> {book.art}</Text>
            <Text><strong>Preis:</strong> {book.preis.toFixed(2).replace('.', ',')} €</Text>
            <Text><strong>Rabatt:</strong> {(book.rabatt*100).toFixed(2).replace('.', ',')} %</Text>
            <Text><strong>Lieferbar:</strong> {book.lieferbar ? 'Ja' : 'Nein'}</Text>
            <Text><strong>Datum:</strong> {new Date(book.datum).toLocaleDateString()}</Text>
          </VStack>
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
          <Button colorScheme="teal" onClick={() => (router.push(`/suchen/${extractId(book._links.self.href)}/aendern`))}>
            Edit Book
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default BookDetails;

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

const BookDetails = ({ book } : { book: Buch}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white" maxW="3xl" mx="auto">
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex="1" mb={{ base: 4, md: 0 }}>
          <Image
            src={}
            alt={book.titel.titel}
            boxSize="200px"
            objectFit="cover"
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
            <Text><strong>Preis:</strong> {book.preis} €</Text>
            <Text><strong>Rabatt:</strong> {book.rabatt * 100} %</Text>
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
        </Box>
      </Flex>
    </Box>
  );
};

export default BookDetails;

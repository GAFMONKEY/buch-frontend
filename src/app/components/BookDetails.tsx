// src/components/BookDetails.tsx
'use client';

import { Box, Heading, Text, Link, Badge } from '@chakra-ui/react';

const BookDetails = ({ book }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">
        {book.titel.titel} - {book.titel.untertitel}
      </Heading>
      <Text mt={4}>ISBN: {book.isbn}</Text>
      <Text>Rating: {book.rating}</Text>
      <Text>Art: {book.art}</Text>
      <Text>Preis: {book.preis} €</Text>
      <Text>Rabatt: {book.rabatt * 100} %</Text>
      <Text>Lieferbar: {book.lieferbar ? 'Ja' : 'Nein'}</Text>
      <Text>Datum: {new Date(book.datum).toLocaleDateString()}</Text>
      <Link href={book.homepage} color="teal.500" isExternal>
        Homepage
      </Link>
      <Box mt={2}>
        {book.schlagwoerter.map((schlagwort) => (
          <Badge key={schlagwort} mr={1} colorScheme="teal">
            {schlagwort}
          </Badge>
        ))}
      </Box>
    </Box>
  );
};

export default BookDetails;

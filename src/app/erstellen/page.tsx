'use client';
import { useState } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import HorizontalBar from '../../../components/HorizontalBar';
import NewBook from '../components/NewBook';
import { postBuch } from '../service/book.service';

export default function Create() {
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const toast = useToast();

  const handleSubmit = async (bookData, token) => {
    try {
      const formData = new FormData();
      formData.append('token', token);
      formData.append('isbn', bookData.isbn);
      formData.append('rating', bookData.rating.toString());
      formData.append('buchArt', bookData.buchArt);
      formData.append('preis', bookData.preis.toString());
      formData.append('rabatt', bookData.rabatt.toString());
      formData.append('lieferbar', bookData.lieferbar ? 'on' : 'off');
      formData.append('datum', bookData.datum);
      formData.append('homepage', bookData.homepage);
      formData.append('arraySchlagwoerter', bookData.schlagwoerter.join(','));

      console.log('Buchdaten vor dem Absenden:', FormData);
      
      const response = await postBuch(formData, token);
      console.log('Server response:', response);
      
      if (response.status === 201) {
        toast({
          title: 'Buch erfolgreich angelegt.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        setResponseStatus(response.status);
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Buchs:', error);
      setResponseStatus(500);
    }
  };

  return (
    <Box>
      <HorizontalBar
        title="Anlegen"
        subtitle="Starte dein neues Kapitel"
      />
      <Flex direction="column" align="center" p={4}>
        <NewBook onSubmit={handleSubmit} responseStatus={responseStatus} />
      </Flex>
    </Box>
  );
}

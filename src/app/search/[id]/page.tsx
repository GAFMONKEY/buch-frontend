'use client';

import { Spinner, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BookDetails } from '../../components/books/BookDetails';
import { fetchBookDetails } from '@/app/service/book.service';

const BookPage = ({ params }: { params: any }) => {
  const { id } = params;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await fetchBookDetails(id);
        setBook(fetchedBook);
      } catch (error) {
        console.error('Error loading book details:', error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!book) {
    return <div>Error loading book details.</div>;
  }

  return <BookDetails initialBook={book} id={id} />;
};

export default BookPage;

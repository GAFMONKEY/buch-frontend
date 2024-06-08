import { Suspense } from 'react';
import BookDetails from '../../components/BookDetails';
import { Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';
import { agent } from '@/app/lib/httpsAgent';

export const fetchBookDetails = async (id: string) => {
  try {
    const response = await axios.get(`https://localhost:3000/rest/${id}`, {
        httpsAgent: agent,
      });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch book details:', error);
    return null; // Return null or handle error as needed
  }
};

const BookPage = async ({ params }) => {
  const { id } = params;
  const book = await fetchBookDetails(id);

  if (!book) {
    return <div>Error loading book details.</div>;
  }

  return (
    <Suspense fallback={<Center><Spinner size="xl" /></Center>}>
      <BookDetails initialBook={book} id={id} />
    </Suspense>
  );
};

export default BookPage;

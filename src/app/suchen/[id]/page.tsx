import { Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';
import { BookDetails } from '../../components/BookDetails';
import { httpsAgent } from '@/app/lib/httpsAgent';
import { Suspense } from 'react';

export const fetchBookDetails = async (id: string) => {
  try {
    const response = await axios.get(`https://localhost:3000/rest/${id}`, {
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch book details:', error);
    return null;
  }
};

const BookPage = async ({ params }: { params: any }) => {
  const { id } = params;
  const book = await fetchBookDetails(id);

  if (!book) {
    return <div>Error loading book details.</div>;
  }

  return (
    <Suspense
      fallback={
        <Center>
          <Spinner size="xl" />
        </Center>
      }
    >
      <BookDetails initialBook={book} id={id} />
    </Suspense>
  );
};

export default BookPage;

import { Suspense } from 'react';
import BookDetails from '../../components/BookDetails';
import { Spinner, Center } from '@chakra-ui/react';

const fetchBookDetails = async (id) => {
  const response = await fetch(`https://localhost:3000/rest/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book details');
  }
  return response.json();
};

const BookPage = async ({ params }) => {
  const { id } = params;
  const book = await fetchBookDetails(id);

  return (
    <Suspense fallback={<Center><Spinner size="xl" /></Center>}>
      <BookDetails book={book} />
    </Suspense>
  );
};

export default BookPage;

import { Spinner, Center } from '@chakra-ui/react';
import { Suspense } from 'react';
import { BookDetails } from '../../components/books/BookDetails';
import { fetchBookDetails } from '@/app/service/book.service';

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

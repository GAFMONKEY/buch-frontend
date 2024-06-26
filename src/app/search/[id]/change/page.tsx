import { fetchBookDetails } from '@/app/service/book.service';
import { ChangeBook } from '@/app/components/books/ChangeBook';
interface ChangePageProps {
  params: {
    id: string;
  };
}

const Change = async ({ params }: ChangePageProps) => {
  const { id } = params;

  const response = await fetchBookDetails(id);
  if (!response) {
    return {
      redirect: {
        destination: `/search/${id}`,
        permanent: false,
      },
    };
  }

  const book = response;
  const eTag = response.eTag ?? '';

  return (
    <div>
      <ChangeBook book={book} id={id} eTag={eTag} />
    </div>
  );
};

export default Change;
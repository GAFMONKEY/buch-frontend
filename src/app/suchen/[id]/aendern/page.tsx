import ChangeBook from "@/app/components/ChangeBook";
import axios from 'axios';
import { agent } from "@/app/lib/httpsAgent";

const fetchBookDetails = async (id: string) => {
  const response = await axios.get(`https://localhost:3000/rest/${id}`, {
    httpsAgent: agent,
  });
  if (response.status != 200) {
    throw new Error('Failed to fetch book details');
  }
  const eTag = response.headers['etag'];

  const body = await response.data;
  return { body, eTag };
};

const Aendern = async ({ params }) => {
  const { id } : {id: string } = params;

  const response = await fetchBookDetails(id);
  const book: Buch = response.body;
  const eTag = response.eTag??'';
    
  return (
    <ChangeBook book={book} id={id} eTag={eTag} />
  );
}
export default Aendern;

import ChangeBook from "@/app/components/ChangeBook";

const fetchBookDetails = async (id) => {
    const response = await fetch(`https://localhost:3000/rest/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    return response.json();
  };

const Aendern = async ({ params }) => {
    const { id } = params;

    const book = await fetchBookDetails(id);
  
    return (
      <ChangeBook book={book}/>
    );
}
export default Aendern;
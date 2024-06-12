
import { ChangeBook } from "@/app/components/ChangeBook";
import { useRouter } from "next/navigation";
import { fetchBookDetails } from "@/app/service/book.service";

const Aendern = async ({ params }: {params: any}) => {
  const { id } : {id: string } = params;
  //const router = useRouter();

  const response = await fetchBookDetails(id);
  if (!response) {
    //router.push(`/suchen/${id}`);
    return;
  }
  const book = response.body;
  const eTag = response.eTag??'';
    
  return (
    <ChangeBook book={book} id={id} eTag={eTag} />
  );
}
export default Aendern;
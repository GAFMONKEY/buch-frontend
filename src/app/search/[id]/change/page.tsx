import { fetchBookDetails } from '@/app/service/book.service';
import { ChangeBook } from '@/app/components/books/ChangeBook';
import { Box, Flex, useToast } from '@chakra-ui/react';
import HorizontalBar from '@/app/components/common/HorizontalBar';

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
        <Box>
            <HorizontalBar
                title='Ändern'
                subtitle='Aktualisiere deine Buchdaten'
            />
            <ChangeBook book={book} id={id} eTag={eTag} />
        </Box>
    );
};

export default Change;

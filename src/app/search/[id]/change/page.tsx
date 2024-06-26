import { fetchBookDetails } from '@/app/service/book.service';
import { ChangeBook } from '@/app/components/books/ChangeBook';
import { Box, Flex } from '@chakra-ui/react';
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
            subtitle='Aktualisiere deine Buchdaten '
        />
        <Flex direction='column' align='center' p={4}>
        <ChangeBook book={book} id={id} eTag={eTag} />
        </Flex>
    </Box>
    );
};

export default Change;
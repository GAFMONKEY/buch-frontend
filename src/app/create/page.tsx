'use client';
import { Box, Flex, useToast } from '@chakra-ui/react';
import HorizontalBar from '../components/common/HorizontalBar';
import CreateBook from '../components/books/CreateBook';

export default function Create() {
    return (
        <Box>
            <HorizontalBar
                title="Anlegen"
                subtitle="Starte dein neues Kapitel"
            />
            <Flex direction="column" align="center" p={4}>
                <CreateBook />
            </Flex>
        </Box>
    );
}

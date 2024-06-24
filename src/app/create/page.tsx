'use client';
import { Box, Flex, useToast } from '@chakra-ui/react';
import HorizontalBar from '../components/common/HorizontalBar';
import NewBook from '../components/books/NewBook';

export default function Create() {
  return (
    <Box>
      <HorizontalBar title="Anlegen" subtitle="Starte dein neues Kapitel" />
      <Flex direction="column" align="center" p={4}>
        <NewBook />
      </Flex>
    </Box>
  );
}

'use client';
import { Box, Flex, useToast } from '@chakra-ui/react';
import HorizontalBar from '../components/HorizontalBar';
import NewBook from '../components/NewBook';

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

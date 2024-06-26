import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

interface BarProperties {
    title: string;
    subtitle: string;
}

const HorizontalBar = ({ title, subtitle }: BarProperties) => {
    return (
        <Box className="horizontal-bar">
            <Flex
                className="horizontal-bar-flex"
                direction="column"
                align="center"
            >
                <Heading
                    as="h1"
                    size="4xl"
                    fontWeight="bold"
                    color="black"
                    mb="4"
                >
                    {title}
                </Heading>
                <Text fontSize="2xl" color="black" mt="2">
                    {subtitle}
                </Text>
            </Flex>
        </Box>
    );
};

export default HorizontalBar;

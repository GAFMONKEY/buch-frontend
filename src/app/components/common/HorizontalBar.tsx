import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

interface BarProperties {
    title: string;
    subtitle: string;
}

const HorizontalBar = ({ title, subtitle }: BarProperties) => {
    return (
        <Box className='horizontal-bar'>
            <Flex
                className='horizontal-bar-flex'
                direction='column'
                align='center'
            >
                <Heading
                    as='h1'
                    size='3xl'
                    fontWeight='bold'
                    color='black'
                    mt={1}
                >
                    {title}
                </Heading>
                <Text fontSize='2xl' color='black'>
                    {subtitle}
                </Text>
            </Flex>
        </Box>
    );
};

export default HorizontalBar;

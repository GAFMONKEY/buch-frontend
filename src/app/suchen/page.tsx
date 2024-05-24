'use client'

import { useEffect, useState } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, HStack, SimpleGrid, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import AdvancedSearch from "../components/AdvancedSearch";
import getBuecher from "../lib/getBuecher";
import { FaEye } from "react-icons/fa6";

export default function Suchen({
  searchParams
}: {
  searchParams: {
    titel: string;
  }
}) {
  const [buecher, setBuecher] = useState<Buch[]>([]);

  useEffect(() => {
    const fetchBuecher = async () => {
      const buecherData: Promise<Buch[]> = getBuecher(`titel=${searchParams.titel}`);
      setBuecher(await buecherData);
    }
    fetchBuecher();
  }, [searchParams])

  // isbn: string;
  // rating: number;
  // art: string;
  // preis: number;
  // lieferbar: boolean;
  // schlagwoerter: string[];
  // titel: {
  //   titel: string;
  //   untertitel: string;
  // };

  return (
    <SimpleGrid>
      <AdvancedSearch />
      <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {buecher && buecher.map(buch => (
          <Card key={buch.isbn} borderTop='8px' borderColor='teal.400'>
            <CardHeader>
              <Flex justifyContent='space-between' alignItems='center'>
                <Stack>
                  <HStack>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Text
                      color={'teal.500'}
                      textTransform={'uppercase'}
                      fontWeight={800}
                      fontSize={'sm'}
                      letterSpacing={1.1}>
                        {buch.art}
                      </Text>
                      <Button variant='ghost' colorScheme='teal' leftIcon={<FaEye />}>Details</Button>
                    </Box>
                  </HStack>
                  <Heading size='md'>{buch.titel.titel}</Heading>
                  {/* TODO Rating */}
                </Stack>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>{buch.schlagwoerter && buch.schlagwoerter.map((schlagwort, index) => (
                <Text key={index}
                  fontSize={'sm'}
                  fontWeight={500}
                  bg={'teal.50'}
                  p={2}
                  px={3}
                  color={'green.500'}
                  rounded={'full'}
                >
                  {schlagwort}
                </Text>
              ))}
              </Text>
            </CardBody>
            <Divider borderColor={'gray.200'} />
            <CardFooter>
              <HStack>
                {/* TODO Preisdarstellung */}
                <Text color='teal.600' fontSize='xl'>{buch.preis}€</Text>
                {/* TODO <Text>lieferbar?</Text> */}
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </SimpleGrid>
  );
}

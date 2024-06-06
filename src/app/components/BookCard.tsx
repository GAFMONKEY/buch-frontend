'use client'
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { FaEye, FaStar } from "react-icons/fa6";
import extractId from '../lib/extractId';
import { useRouter } from 'next/navigation';


const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array(5).fill(0);

    return (
      <HStack>
        {stars.map((_, index) => (
          <Icon
            as={FaStar}
            key={index}
            color={index < rating ? 'teal.500' : 'gray.300'}
            boxSize={5}
            style={{ marginTop: '8px' }}
          />
        ))}
      </HStack>
    );
  };

  const Lieferbar = ({ lieferbar }: { lieferbar: boolean }) => {
    return (
      <Badge
        colorScheme={lieferbar ? 'green' : 'red'}
        variant="subtle"
        fontSize="sm"
        fontWeight="500"
        px={3}
        rounded="full"
        m={1}
      >
        {lieferbar ? 'LIEFERBAR' : 'NICHT LIEFERBAR'}
      </Badge>
    );
  };

const BookCard = ({ buch }: {buch: Buch}) => {
    const router = useRouter();
    return(
        <Card key={buch.isbn} borderTop='8px' borderColor='teal.400' bg='white'>
        <CardHeader>
          <Flex direction='column' w='100%'>
            <Flex justify='space-between' alignItems='center' w='100%'>
              <Text
                color={'teal.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}>
                {buch.art}
              </Text>
              <Button variant='ghost' colorScheme='teal' leftIcon={<FaEye />} onClick={() => router.push(`/suchen/${extractId(buch._links.self.href)}`)}>Details</Button>
            </Flex>
            <Heading size='md'>{buch.titel.titel}</Heading>
            <StarRating rating={buch.rating} />
          </Flex>
        </CardHeader>
        <CardBody>
          {buch.schlagwoerter && buch.schlagwoerter.map((schlagwort, index) => (
            <Badge
              key={index}
              fontSize='sm'
              fontWeight='500'
              colorScheme='teal'
              px={3}
              rounded='full'
              m={1}
            >
              {schlagwort}
            </Badge>
          ))}
        </CardBody>
        <Divider borderColor={'gray.200'} />
        <CardFooter>
          <HStack justify='space-between' alignItems='center' w='100%'>
            <Text color='teal.600' fontSize='xl'>{buch.preis.toFixed(2).replace('.', ',')}€</Text>
            <Lieferbar lieferbar={buch.lieferbar} />
          </HStack>
        </CardFooter>
      </Card>
    )
};

export default BookCard;

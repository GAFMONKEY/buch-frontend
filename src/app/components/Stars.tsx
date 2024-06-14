import type { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface StarProperties {
  value: number;
  onChange: (rating: number) => void;
}

const Stars: FC<StarProperties> = ({ value, onChange }) => {
  const handleClick = (rating: number) => {
    onChange(rating);
  };

  return (
    <Flex>
      <Text fontSize="xl" mr={2}>
        Bewertung:
      </Text>
      {[1, 2, 3, 4, 5].map((rating) => (
        <Text
          key={rating}
          fontSize="xl"
          cursor="pointer"
          onClick={() => handleClick(rating)}
          color={value >= rating ? 'teal.500' : 'gray.300'}
          transition="color 0.2s"
          display="inline-block"
          mr={1}
        >
          ★
        </Text>
      ))}
    </Flex>
  );
};

export default Stars;

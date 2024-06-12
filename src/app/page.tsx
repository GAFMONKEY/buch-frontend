import { Box, Container, Text } from '@chakra-ui/react';
import Image from 'next/image';
import HorizontalBar from '../../components/HorizontalBar';
import { Providers } from './components/Providers';

export default function Home() {
  return (
    <Providers>
      <Container as='section' maxWidth='6xl' py='20px'>
      <HorizontalBar title="Willkommen bei BuchWelt" subtitle="Entdecken Sie die Welt der Bücher" />
        <Text textAlign={'justify'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sit delectus! Sunt repudiandae iure et voluptatum voluptatibus facere error aliquid porro maxime corrupti, ducimus eos quo, veritatis voluptate laborum neque sed omnis hic quas consequatur, placeat minima aperiam voluptas excepturi.
        </Text>
        <Box display={{ base: 'none', md: 'block' }} mt='20px'>
          <Image
            src='/pratchett-desktop.jpeg'
            width={1280}
            height={333}
            alt='Foto einer Regalreihe von Terry Pratchett-Werken'
          />
        </Box>
        <Box display={{ base: 'block', md: 'none' }} mt='20px'>
          <Image
            src='/mitchell-mobile.jpeg'
            width={1018}
            height={1280}
            alt='Foto der David Mitchell-Werke Slade House und The Bone Clocks'
          />
        </Box>
      </Container>
    </Providers>
  );
}

import Image from "next/image";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { Providers } from './components/Providers';
import HorizontalBar from '../../components/HorizontalBar'; 

export default function Home() {
  return (
    <Providers>
      <Container as='section' maxWidth='6xl' py='20px'>
      <HorizontalBar title="Willkommen bei BuchWelt" subtitle="Entdecken Sie die Welt der Bücher" />
        <Text textAlign={'justify'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus tempora nulla magni sequi atque iure voluptatum aliquid eum dicta nobis illum similique quidem architecto nihil ullam vero asperiores doloremque repudiandae, ad laborum maiores. Expedita quibusdam est consequuntur quia! Sapiente aperiam ut dolores excepturi eligendi et, doloremque consequatur cum facere vitae, perspiciatis tenetur deserunt, delectus similique ipsum cupiditate libero ea inventore. Quibusdam quam incidunt eveniet enim nobis nulla repellendus molestias, recusandae suscipit est repudiandae pariatur quis. Cum perspiciatis inventore at nisi mollitia rem iusto natus. Tempore sint voluptatem nemo quas magni, exercitationem et esse velit ipsum dolorem nobis, quis rem asperiores.
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

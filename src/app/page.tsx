import { Box, Container, Text } from '@chakra-ui/react';
import Image from 'next/image';
import HorizontalBar from './components/common/HorizontalBar';
import { Providers } from './components/layout/Providers';

export default function Home() {
    return (
        <Providers>
            <Container as="section" maxWidth="6xl" py="20px">
                <HorizontalBar
                    title="Willkommen bei BuchWelt"
                    subtitle="Entdecken Sie die Welt der Bücher"
                />
                <Text textAlign={'justify'}>
                    In unserer Bibliothek finden Sie alles von zeitlosen
                    Klassikern bis hin zu aktuellen Bestsellern. Egal, ob Sie
                    auf der Suche nach Entspannung, Unterhaltung oder neuen
                    Erkenntnissen sind, wir haben das passende Buch für Sie.
                </Text>
                <Box display={{ base: 'none', md: 'block' }} mt="20px">
                    <Image
                        src="/pratchett-desktop.jpeg"
                        width={1280}
                        height={333}
                        alt="Foto einer Regalreihe von Terry Pratchett-Werken"
                    />
                </Box>
                <Box display={{ base: 'block', md: 'none' }} mt="20px">
                    <Image
                        src="/mitchell-mobile.jpeg"
                        width={1018}
                        height={1280}
                        alt="Foto der David Mitchell-Werke Slade House und The Bone Clocks"
                    />
                </Box>
            </Container>
        </Providers>
    );
}

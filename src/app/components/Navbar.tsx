import { Button, ButtonGroup, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import Login from '../login/page';
import { MdLogin } from "react-icons/md"
import Link from 'next/link';

export default function Navbar() {

  const loginButtonStyles = {
    ':hover': {
        color: 'black',
        bg: 'teal.200',
      }
  }
  return (
    <Flex as='nav' padding='10px' alignItems='center' gap='10px' bg='teal.700' wrap='wrap'>
        <Heading as='h1' color='white'>Gruppe 5</Heading>
        <Spacer />

        <HStack spacing='36px' wrap='wrap'>
            <ButtonGroup variant='link' spacing='36px'>
                <Link
                    href='/'
                >
                    <Button color='white'>Startseite</Button>
                </Link>
                <Link
                    href='suchen'
                >
                    <Button color='white'>Alle Bücher</Button>
                </Link>
                <Link
                    href='suchen'
                >
                    <Button color='white'>Erweiterte Suche</Button>
                </Link>
                <Link
                    href='erstellen'
                >
                    <Button color='white'>Neuanlegen</Button>
                </Link>
            </ButtonGroup>
            <Link
                    href='login'
                >
                <Button
                    variant='outline'
                    color='white'
                    colorScheme='teal.500'
                    rightIcon={<MdLogin />}
                    sx={loginButtonStyles}
                >
                        Login
                </Button>
            </Link>
        </HStack>
    </Flex>
  )
}
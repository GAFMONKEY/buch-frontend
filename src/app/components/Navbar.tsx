'use client';
import { Button, ButtonGroup, Flex, Heading, HStack, Spacer, Box } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { MdLogin, MdLogout } from "react-icons/md";
import Link from 'next/link';
import Searchbar from './Searchbar';

export default function Navbar() {
  const loginButtonStyles = {
    ':hover': {
      color: 'black',
      bg: 'teal.200',
      transition: 'background-color 0.3s ease',
    },
  };

  const { isAuthenticated } = useAuth();

  return (
    <Box
      as='nav'
      paddingY='10px'
      paddingX='20px'
      bgGradient='linear(to-r, teal.500, teal.600)'
      boxShadow='lg'
      position='sticky'
      top='0'
      zIndex='1000'
      width='100%'
    >
      <Flex alignItems='center' justifyContent='space-between' wrap='wrap'>
        <Link href='/'>
          <Heading as='h1' color='white' fontSize='2xl' _hover={{ color: 'teal.200' }}>
            Gruppe 5
          </Heading>
        </Link>

        <Box display={{ base: 'none', md: 'block' }} flex='1' mx='20px'>
          <Searchbar />
        </Box>

        <HStack spacing='24px' wrap='wrap'>
          <ButtonGroup variant='link' spacing='24px'>
            <Link href='/'>
              <Button color='white' _hover={{ color: 'teal.200' }}>Startseite</Button>
            </Link>
            <Link href='/suchen'>
              <Button color='white' _hover={{ color: 'teal.200' }}>Alle Bücher</Button>
            </Link>
            <Link href={isAuthenticated ? '/erstellen' : '/login'}>
              <Button isDisabled={isAuthenticated} _hover={{ color: 'teal.200' }}>
                Neuanlegen
              </Button>     
            </Link>
          </ButtonGroup>
          <Link href={isAuthenticated ? '/logout' : '/login'}>
            <Button
              variant='outline'
              color='white'
              borderColor='white'
              _hover={loginButtonStyles[':hover']}
              rightIcon={isAuthenticated ? <MdLogout /> : <MdLogin />}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </Link>
        </HStack>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} mt='10px'>
        <Searchbar />
      </Box>
    </Box>
  );
}

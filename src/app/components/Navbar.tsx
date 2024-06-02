'use client';
import { Button, ButtonGroup, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import Login from '../login/page';
import { MdLogin, MdLogout } from "react-icons/md"
import Link from 'next/link';
import Searchbar from './Searchbar';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const loginButtonStyles = {
    ':hover': {
        color: 'black',
        bg: 'teal.200',
      }
  }

  const { isAuthenticated } = useAuth();

  return (
    <Flex as='nav' padding='10px' alignItems='center' gap='10px' bg='teal.700' wrap='wrap'>
        <Heading as='h1' color='white'>Gruppe 5</Heading>
        
        <Spacer />
        <Searchbar />
        <Spacer />
  
        <HStack spacing='36px' wrap='wrap'>
            <ButtonGroup variant='link' spacing='36px'>
                <Link href='/'>
                    <Button color='white'>Startseite</Button>
                </Link>
                <Link href='suchen'>
                    <Button color='white'>Alle Bücher</Button>
                </Link>
                <Link href='suchen'>
                    <Button color='white'>Erweiterte Suche</Button>
                </Link>
                <Link href={isAuthenticated ? 'erstellen' : 'login'}>
                    <Button color={isAuthenticated ? 'white' : 'grey'}>Neuanlegen</Button>
                </Link>
            </ButtonGroup>
            <Link href={isAuthenticated ? 'logout' : 'login'} >
                <Button
                    variant='outline'
                    color='white'
                    colorScheme='teal.500'
                    rightIcon={isAuthenticated ? <MdLogout /> : <MdLogin />}
                    sx={loginButtonStyles}
                >
                    {isAuthenticated ? 'Logout' : 'Login'}
                </Button>
            </Link>
        </HStack>
    </Flex>
  )
}
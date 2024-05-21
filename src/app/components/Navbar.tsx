import { Button, ButtonGroup, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import Login from '../login/page';
import { MdLogin } from "react-icons/md"

export default function Navbar() {

  const loginButtonStyles = {
    ':hover': {
        color: 'black',
        bg: 'teal.200',
      }
  }
  return (
    <Flex as='nav' padding='10px' alignItems='center' gap='10px' bg='teal.700'>
        <Heading as='h1' color='white'>Gruppe 5</Heading>
        
        <Spacer />
        <HStack spacing='36px'>
            <ButtonGroup variant='link' spacing='36px'>
                <Button color='white'>Startseite</Button>
                <Button color='white'>Alle Bücher</Button>
                <Button color='white'>Erweiterte Suche</Button>
                <Button color='white'>Neuanlegen</Button>
            </ButtonGroup>
            <Button
                variant='outline'
                color='white'
                colorScheme='teal.500'
                rightIcon={<MdLogin />}
                sx={loginButtonStyles}
            >
                    Login
            </Button>
        </HStack>

    </Flex>
  )
}
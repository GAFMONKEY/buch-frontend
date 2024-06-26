'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    Spinner,
    InputRightElement,
    InputGroup,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        setLoading(false);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            setIsAuthenticated(true);
            router.back();
        } else {
            setError('Falsche Einloggdaten');
        }
    };

    const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Box maxW='550px' p={5}>
            <Text fontSize='2xl' mb={5}>
                Login
            </Text>
            <Box as='form' onSubmit={handleLogin}>
                <FormControl id='username' mb={4}>
                    <FormLabel>Username:</FormLabel>
                    <Input
                        variant='filled'
                        backgroundColor={'white'}
                        border='1px solid'
                        borderColor='black'
                        _focus={{ borderColor: 'teal.500', borderWidth: '2px' }}
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl id='password' mb={4}>
                    <FormLabel>Password:</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            variant='filled'
                            backgroundColor={'white'}
                            border='1px solid'
                            borderColor='black'
                            _focus={{
                                borderColor: 'teal.500',
                                borderWidth: '2px',
                            }}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width='6rem'>
                            <Button
                                h='2rem'
                                size='sm'
                                width='90px'
                                onClick={handleTogglePasswordVisibility}
                            >
                                {showPassword ? 'Verstecken' : 'Anzeigen'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    isLoading={loading}
                    colorScheme='teal'
                    type='submit'
                    mb={4}
                >
                    Login
                </Button>
            </Box>
            {error && <Text color='red.500'>{error}</Text>}
        </Box>
    );
};

export default LoginPage;

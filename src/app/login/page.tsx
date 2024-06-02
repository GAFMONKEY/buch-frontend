'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, FormLabel, Input, Text, Spinner } from "@chakra-ui/react";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      router.push('/');
    } else {
      setError('Falsche Einloggdaten');
    }
  };

  return (
    <Box maxW="500px" p={5}>
    <Text fontSize="2xl" mb={5}>Login</Text>
    <form onSubmit={handleLogin}>
        <FormControl id="username" mb={4}>
        <FormLabel>Username:</FormLabel>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="password" mb={4}>
        <FormLabel>Password:</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" type="submit" mb={4}>Login</Button>
    </form>
    {error && <Text color="red.500">{error}</Text>}
    {loading && <Spinner />}
    </Box>
  );
};

export default LoginPage;

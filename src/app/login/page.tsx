'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      //router.push('/');
      setError('Holy shit ich bin eingeloggt!');
    } else {
      setError('Invalid credentials');
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
    </Box>
  );
};

export default LoginPage;

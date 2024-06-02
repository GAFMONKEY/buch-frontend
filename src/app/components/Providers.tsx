// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider><ChakraProvider>{children}</ChakraProvider></AuthProvider>
}
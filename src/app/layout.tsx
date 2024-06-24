import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Navbar } from './components/common/Navbar';
import { Providers } from './components/layout/Providers';
import { Box } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Box as="header" position="fixed" width="100%" zIndex="1000">
            <Navbar />
          </Box>
          <Box mt="40px">{children}</Box>
        </Providers>
      </body>
    </html>
  );
}

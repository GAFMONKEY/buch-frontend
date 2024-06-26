'use client';

import { FormControl, HStack, IconButton, Input } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function Searchbar() {
    const [titel, setTitel] = useState('');

    return (
        <HStack>
            <FormControl>
                <Input
                    variant="filled"
                    backgroundColor={'white'}
                    placeholder="Nach Titel suchen..."
                    focusBorderColor="teal.300"
                    _focus={{ bg: 'white' }}
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                />
            </FormControl>
            <Link
                href={{
                    pathname: '/search',
                    query: {
                        titel: titel,
                    },
                }}
            >
                <IconButton
                    type="submit"
                    backgroundColor={'teal.200'}
                    aria-label="Titelsuche"
                    icon={<FiSearch />}
                    fontSize="24px"
                ></IconButton>
            </Link>
        </HStack>
    );
}

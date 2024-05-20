import Link from 'next/link';
import { Button } from '@chakra-ui/react';

export function LinkButton({ link, text } : { link: string, text: string }) {

    return (
        <Link href={link}>
        <Button colorScheme='teal' variant='solid'>
          {text}
        </Button>
        </Link>
    );
  }
  
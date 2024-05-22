import { HStack, IconButton, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function Searchbar() {
  return (
    <HStack>
        <Input
            variant='filled'
            backgroundColor={'white'}
            placeholder='Nach Titel suchen...'
            focusBorderColor='teal.300'
            _focus={{ bg: 'white' }}
    />
        <IconButton
            backgroundColor={'teal.200'}
            aria-label='Titelsuche'
            icon={<FiSearch />}
            fontSize='24px'
            >
        </IconButton>
    </HStack>
  )
}
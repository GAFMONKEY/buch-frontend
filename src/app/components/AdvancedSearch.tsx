import { Box, Button, Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Select, VStack } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function AdvancedSearch() {
  return (
    <Box maxW='400px' p='10px' m={5} borderWidth='1px' borderRadius='lg' display='wrap' alignItems='baseline'>
        <VStack>
            <FormControl display='flex' alignItems='center'>
                <FormLabel mb='0'>Titel:</FormLabel>
                <Input
                    variant='flushed'
                    backgroundColor={'white'}
                    type='text'
                    name='Titel'
                    placeholder='Nach Titel suchen...'
                    focusBorderColor='teal.300'
                />
            </FormControl>
            <FormControl>
                <RadioGroup name='BuchArt' colorScheme='teal'>
                    <Radio value='Druckausgabe' ml='10px'>Druckausgabe</Radio>
                    <Radio value='eBook' ml='10px'>eBook</Radio>
                    <Radio value='' ml='10px'>keine Angabe</Radio>
                </RadioGroup>
            </FormControl>
            <FormControl>
                <Select placeholder='Bewertung'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </Select>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
                <Checkbox
                    name='lieferbar'
                    size='lg'
                    colorScheme='teal'
                />
                <FormLabel mb='0' ml='10px'>
                    lieferbar?
                </FormLabel>
            </FormControl>
            <Button colorScheme='teal' leftIcon={<FiSearch />}>
                Suchen
            </Button>
        </VStack>
    </Box>
  )
}

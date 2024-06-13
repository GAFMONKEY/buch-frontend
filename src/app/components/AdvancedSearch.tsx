import { Box, Button, Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Select, VStack } from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export const AdvancedSearch = () => {
    const [titel, setTitel] = useState('');
    const [art, setArt] = useState('');
    const [rating, setRating] = useState('');
    const [lieferbar, setLieferbar] = useState(false);

    const router = useRouter();

    const handleSearch = () => {
        const params = {
            titel,
            art,
            rating,
            lieferbar: lieferbar ? 'true' : undefined,
          };
        
          const filteredParams = Object.entries(params)
            .filter(([, value]) => value !== '' && value !== undefined)
            .map(([key, value]) => `${key}=${value}`);
        
          const queryString = filteredParams.join('&');
        
          console.log('Suche mit Query: ', queryString);
        
          router.push(`/suchen${queryString ? `?${queryString}` : '?titel='}`);
    }

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
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <RadioGroup
                    name='BuchArt'
                    colorScheme='teal'
                    value={art}
                    onChange={(value) => setArt(value)}
                    >
                    <Radio value='DRUCKAUSGABE' ml='10px'>Druckausgabe</Radio>
                    <Radio value='KINDLE' ml='10px'>Kindle</Radio>
                    <Radio value='' ml='10px'>keine Angabe</Radio>
                </RadioGroup>
            </FormControl>
            <FormControl>
                <Select
                    placeholder='Bewertung'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    >
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
                    isChecked={lieferbar}
                    onChange={(e) => setLieferbar(e.target.checked)}
                />
                <FormLabel mb='0' ml='10px'>
                  Nur lieferbare Bücher anzeigen
                </FormLabel>
            </FormControl>
            <Button colorScheme='teal' leftIcon={<FiSearch />} onClick={handleSearch}>
                Suchen
            </Button>
        </VStack>
    </Box>
  )
};

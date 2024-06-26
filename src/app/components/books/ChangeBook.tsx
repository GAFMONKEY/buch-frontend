'use client';
import React, { useState } from 'react';
import {
    Input,
    Checkbox,
    Button,
    Box,
    Stack,
    Select,
    Flex,
    Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { putBuch } from '../../service/book.service';
import Link from 'next/link';

export const ChangeBook = ({
    book,
    id,
    eTag,
}: {
    book: Buch;
    id: string;
    eTag: string;
}) => {
    const [isbn, changeIsbn] = useState(book.isbn);
    const [buchArt, changeBuchArt] = useState(book.art);
    const [preis, changePreis] = useState(book.preis.toFixed(2));
    const [rabatt, changeRabatt] = useState(book.rabatt.toFixed(3));
    const [datum, changeDatum] = useState<Date>(new Date(book.datum));
    const [rating, setSelectedRating] = useState(book.rating);
    const [homepage, changeHomepage] = useState(book.homepage);
    const [schlagwoerter, setSchlagwoerter] = useState<string[]>(
        book.schlagwoerter,
    );
    const [lieferbar, changeLieferbar] = useState(book.lieferbar);
    const [errors, setErrors] = useState<BookErrors>({
        isbn: '',
        titel: '',
        untertitel: '',
        preis: '',
        rabatt: '',
        homepage: '',
        rating: '',
    });

    const validateForm = (): BookErrors => {
        const newErrors: BookErrors = {
            isbn: '',
            titel: '',
            untertitel: '',
            preis: '',
            rabatt: '',
            homepage: '',
            rating: '',
        };

        const isbnPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
        if (!isbn || !isbnPattern.test(isbn)) {
            newErrors.isbn = 'Bitte geben Sie eine gültige ISBN ein';
        }
        const preisPattern = /^\d+(\.\d{2})?$/;
        if (!preis) {
            newErrors.preis = 'Preis ist erforderlich!';
        } else if (parseFloat(preis) <= 0) {
            newErrors.preis = 'Preis muss größer als 0 sein!';
        } else if (!preisPattern.test(preis)) {
            newErrors.preis = 'Preis bitte mit 2 Nachkommastellen angeben!';
        }
        const rabattPattern = /^(0(\.\d{1,3})?|1(\.0{1,3})?)$/;
        if (!rabatt) {
            newErrors.rabatt = 'Rabatt ist erforderlich!';
        } else if (!rabattPattern.test(rabatt)) {
            newErrors.rabatt =
                'Rabatt muss zwischen 0 und 1 liegen und darf maximal 3 Nachkommastellen haben!';
        }
        if (rating < 0 || rating > 5 || !Number.isInteger(rating)) {
            newErrors.rating =
                'Die Bewertung muss eine Ganzzahl zwischen 0 und 5 sein';
        }
        const homepagePattern =
            /^(https?:\/\/)(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
        if (!homepage || typeof homepage !== 'string') {
            newErrors.homepage = 'Homepage ist erforderlich!';
        } else if (!homepagePattern.test(homepage)) {
            newErrors.homepage =
                'Bitte geben Sie eine gültige Homepage-URL ein!';
        }

        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {
            const formData = {
                isbn,
                art: buchArt,
                preis: parseFloat(preis),
                rabatt: parseFloat(rabatt),
                datum: datum.toISOString(),
                rating,
                homepage,
                schlagwoerter,
                lieferbar,
            };

            const getAccessToken = (): string | null => {
                return localStorage.getItem('access_token');
            };
            const token = getAccessToken() ?? '';
            if (token == '' || !token) {
                window.location.href = '/login'; // Redirect to login page
                return;
            }

            try {
                const response = await putBuch(formData, token, id, eTag);
                if (response.status === 204) {
                    alert('Buch erfolgreich geändert!');
                    window.location.href = `/search/${id}`; // Redirect to search page
                }
            } catch (error) {
                console.error('Fehler beim Ändern des Buches:', error);
            }
        } else {
            alert('Bitte überprüfen Sie Ihre Eingaben!');
        }
    };

    const handleBuchArtChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        changeBuchArt(event.target.value);
    };

    const displayStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    onClick={() => setSelectedRating(i + 1)}
                    color={i < rating ? 'teal.500' : 'gray.300'}
                    boxSize={'20px'}
                />,
            );
        }
        return stars;
    };

    const CustomInput = React.forwardRef(
        ({ value, onClick }: any, ref: any) => (
            <Input onClick={onClick} ref={ref} value={value} />
        ),
    );
    CustomInput.displayName = 'CustomInput';

    return (
        <Box as='form' onSubmit={handleSubmit} p={4} maxWidth={'60%'}>
            <Box>
                <label htmlFor='isbn'>ISBN:</label>
                <Input
                    id='isbn'
                    placeholder='z.B. 978-3-897-22583-1'
                    focusBorderColor='teal.300'
                    value={isbn}
                    onChange={(e) => changeIsbn(e.target.value)}
                />
                {errors.isbn && <Text color='red.500'>{errors.isbn}</Text>}
            </Box>
            <Box>
                <label htmlFor='titel'>Titel:</label>
                <Input
                    id='titel'
                    placeholder='z.B. Alpha'
                    focusBorderColor='teal.300'
                    value={book.titel.titel}
                    backgroundColor='gray.200'
                    cursor='not-allowed'
                    isReadOnly
                />
            </Box>
            <Box>
                <label htmlFor='untertitel'>Untertitel:</label>
                <Input
                    id='untertitel'
                    placeholder='z.B. alpha'
                    focusBorderColor='teal.300'
                    value={book.titel.untertitel}
                    backgroundColor='gray.200'
                    cursor='not-allowed'
                    isReadOnly
                />
            </Box>
            <Box>
                <label htmlFor='buchArt'>Art:</label>
                <Select
                    id='buchArt'
                    placeholder='Wählen Sie die Art des Buches'
                    focusBorderColor='teal.300'
                    value={buchArt}
                    onChange={handleBuchArtChange}
                >
                    <option value='DRUCKAUSGABE'>Druckausgabe</option>
                    <option value='KINDLE'>Kindle</option>
                </Select>
            </Box>
            <Box>
                <label htmlFor='preis'>Preis:</label>
                <Input
                    id='preis'
                    placeholder='z.B. 1.00'
                    focusBorderColor='teal.300'
                    value={preis}
                    onChange={(e) => changePreis(e.target.value)}
                />
                {errors.preis && <Text color='red.500'>{errors.preis}</Text>}
            </Box>
            <Box>
                <label htmlFor='rabatt'>Rabatt(%):</label>
                <Input
                    id='rabatt'
                    placeholder='z.B. 0.1'
                    focusBorderColor='teal.300'
                    value={rabatt}
                    onChange={(e) => changeRabatt(e.target.value)}
                />
                {errors.rabatt && <Text color='red.500'>{errors.rabatt}</Text>}
            </Box>
            <Box>
                <label htmlFor='datum'>Datum:</label>
                <DatePicker
                    selected={datum}
                    onChange={(date: Date) => changeDatum(date)}
                    dateFormat='dd.MM.yyyy'
                    customInput={<CustomInput />}
                />
            </Box>
            <Box>
                <label htmlFor='rating'>Rating:</label>
                <Flex>{displayStars()}</Flex>
                {errors.rating && <Text color='red.500'>{errors.rating}</Text>}
            </Box>
            <Box>
                <label htmlFor='homepage'>Homepage:</label>
                <Input
                    id='homepage'
                    placeholder='z.B. https://www.test.de/'
                    focusBorderColor='teal.300'
                    value={homepage}
                    onChange={(e) => changeHomepage(e.target.value)}
                />
                {errors.homepage && (
                    <Text color='red.500'>{errors.homepage}</Text>
                )}
            </Box>
            <Box>
                <Checkbox
                    colorScheme='teal'
                    isChecked={lieferbar}
                    onChange={(e) => changeLieferbar(e.target.checked)}
                >
                    Lieferbar
                </Checkbox>
            </Box>
            <Box>
                <label htmlFor='schlagwoerter'>Schlagwörter:</label>
                <Input
                    id='schlagwoerter'
                    placeholder='Schlagwörter'
                    focusBorderColor='teal.300'
                    value={schlagwoerter.join(',')}
                    onChange={(e) =>
                        setSchlagwoerter(
                            e.target.value
                                .split(',')
                                .map((word) => word.trim().toUpperCase()),
                        )
                    }
                />
            </Box>
            <Stack
                direction='row'
                spacing={4}
                align='center'
                justify='space-between'
            >
                <Link href='/search'>
                    <Button colorScheme='red' size='md'>
                        Abbrechen
                    </Button>
                </Link>
                <Button type='submit' colorScheme='teal' size='md'>
                    Buch ändern
                </Button>
            </Stack>
        </Box>
    );
};

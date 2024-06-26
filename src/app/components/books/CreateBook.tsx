'use client';
import React, { useEffect, useState } from 'react';
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
import { postBuch } from '../../service/book.service';
import { useRouter } from 'next/navigation';
import extractId from '../../lib/utils/extractId';

export default function CreateBook() {
  const [isbn, setIsbn] = useState('978-3-16-148410-0');
  const [titel, setTitel] = useState('Beispielbuch');
  const [untertitel, setUntertitel] = useState('Eine Beispielgeschichte');
  const [buchArt, setBuchArt] = useState<BuchArt>('DRUCKAUSGABE');
  const [preis, setPreis] = useState('19.99');
  const [rabatt, setRabatt] = useState('0.010');
  const [datum, setDatum] = useState(new Date());
  const [rating, setSelectedRating] = useState(4);
  const [homepage, setHomepage] = useState('https://www.beispielverlag.de');
  const [schlagwoerter, setSchlagwoerter] =
    useState<string>('Fiktion, Abenteuer');
  const [lieferbar, setLieferbar] = useState(true);
  const [errors, setErrors] = useState<BookErrors>({
    isbn: '',
    titel: '',
    untertitel: '',
    preis: '',
    rabatt: '',
    homepage: '',
    rating: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const hasErrors = (errors: BookErrors): boolean => {
    return Object.values(errors).some((error) => error !== '');
  };

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
    if (!titel) {
      newErrors.titel = 'Der Titel muss ein String sein';
    }
    if (!untertitel) {
      newErrors.untertitel = 'Bitte geben Sie einen gültigen Untertitel ein';
    }
    const preisPattern = /^\d+(\.\d{2})?$/;
    if (!preis) {
      newErrors.preis = 'Preis ist erforderlich!';
    } else if (parseFloat(preis) <= 0) {
      newErrors.preis = 'Preis muss größer als 0 sein!';
    } else if (!preisPattern.test(preis)) {
      newErrors.preis = 'Preis bitte mit 2 Nachkommastellen angeben!';
    }
    const rabattPattern = /^(0(\.\d{1,4})?|1(\.0{1,4})?)$/;
    if (!rabatt) {
      newErrors.rabatt = 'Rabatt ist erforderlich!';
    } else if (!rabattPattern.test(rabatt)) {
      newErrors.rabatt =
        'Rabatt muss zwischen 0 und 1 liegen und darf maximal 4 Nachkommastellen haben!';
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
      newErrors.homepage = 'Bitte geben Sie eine gültige Homepage-URL ein!';
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (!hasErrors(errors)) {
      const formData = {
        isbn,
        titel: { titel, untertitel },
        art: buchArt,
        preis: parseFloat(preis),
        rabatt: parseFloat(rabatt),
        datum: datum.toISOString(),
        rating: rating,
        homepage,
        schlagwoerter: schlagwoerter.split(',').map((s) => s.trim()),
        lieferbar,
      };

      const token = localStorage.getItem('access_token') ?? '';
      if (token === '' || !token) {
        router.push('/login');
      }

      try {
        // Hier wird die postBuch-Funktion aufgerufen
        const response = await postBuch(formData, token);
        if (response.status === 201) {
          const buchId = extractId(response.selfLink);
          router.push(`/search/${buchId}`);
        } else {
          alert('Fehler beim Erstellen des Buchs');
        }
      } catch (error) {
        console.error('Fehler:', error);
      }
    }
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
  const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
    <Input onClick={onClick} ref={ref} value={value} />
  ));
  CustomInput.displayName = 'CustomInput';

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxWidth={'60%'}>
      <Box>
        <label htmlFor="isbn">ISBN:</label>
        <Input
          id="isbn"
          placeholder="z.B. 978-3-897-22583-1"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        {errors.isbn && <Text color="red.500">{errors.isbn}</Text>}
      </Box>
      <Box>
        <label htmlFor="titel">Titel:</label>
        <Input
          id="titel"
          placeholder="z.B. Alpha"
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
        />
        {errors.titel && <Text color="red.500">{errors.titel}</Text>}
      </Box>
      <Box>
        <label htmlFor="untertitel">Untertitel:</label>
        <Input
          id="untertitel"
          placeholder="z.B. alpha"
          value={untertitel}
          onChange={(e) => setUntertitel(e.target.value)}
        />
        {errors.untertitel && <Text color="red.500">{errors.untertitel}</Text>}
      </Box>
      <Box>
        <label htmlFor="buchArt">Buchart:</label>
        <Select
          id="buchArt"
          name="buchArt"
          placeholder="Wählen Sie die Buchart aus"
          value={buchArt}
          onChange={(e) => setBuchArt(e.target.value as BuchArt)}
          required
        >
          <option value="KINDLE">KINDLE</option>
          <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
        </Select>
      </Box>
      <Box>
        <label htmlFor="preis">Preis(€):</label>
        <Input
          id="preis"
          placeholder="z.B. 11.11"
          value={preis}
          onChange={(e) => setPreis(e.target.value)}
        />
        {errors.preis && <Text color="red.500">{errors.preis}</Text>}
      </Box>
      <Box>
        <label htmlFor="rabatt">Rabatt(%):</label>
        <Input
          id="rabatt"
          placeholder="z.B. 1.1"
          value={rabatt}
          onChange={(e) => setRabatt(e.target.value)}
        />
        {errors.rabatt && <Text color="red.500">{errors.rabatt}</Text>}
      </Box>
      <Box mt={4} mb={4}>
        <Text mb={2}>Datum:</Text>
        <DatePicker
          selected={datum}
          onChange={(date: Date) => setDatum(date)}
          customInput={<CustomInput />}
          popperPlacement="right"
        />
      </Box>
      <Box mt={2}>
        <Flex justifyContent="flex-start">
          Bewertung:
          <Stack direction="row" mb={4} ml={20}>
            {displayStars()}
          </Stack>
        </Flex>
        {errors.rating && <Text color="red.500">{errors.rating}</Text>}
      </Box>
      <Box>
        <label htmlFor="homepage">Homepage:</label>
        <Input
          id="homepage"
          placeholder="z.B. acme.at"
          value={homepage}
          onChange={(e) => setHomepage(e.target.value)}
        />
        {errors.homepage && <Text color="red.500">{errors.homepage}</Text>}
      </Box>
      <Box>
        <label htmlFor="schlagwoerter">Schlagwörter:</label>
        <Input
          id="schlagwoerter"
          placeholder="z.B. JAVASCRIPT,TYPESCRIPT"
          value={schlagwoerter}
          onChange={(e) => setSchlagwoerter(e.target.value)}
        />
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Checkbox
          mt={2}
          isChecked={lieferbar}
          onChange={(e) => setLieferbar(e.target.checked)}
        >
          Lieferbar
        </Checkbox>
        <Button
          type="submit"
          ml={600}
          minWidth="auto"
          className="submit-button"
          isLoading={loading}
        >
          Neues Buch erstellen
        </Button>
      </Box>
    </Box>
  );
}

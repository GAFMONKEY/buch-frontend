'use client';
import React, { useState } from 'react';
import { Input, Checkbox, Button, Box, Stack, Select, Flex, Text } from "@chakra-ui/react";
import './NewBook.css';
import { StarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postBuch } from '../service/book.service';

export default function NewBook() {
  const [isbn, changeIsbn] = useState('978-3-16-148410-0');
  const [titel, changeTitel] = useState('Beispielbuch');
  const [untertitel, changeUntertitel] = useState('Eine Beispielgeschichte');
  const [buchArt, changeBuchArt] = useState('DRUCKAUSGABE');
  const [preis, changePreis] = useState('19.99');
  const [rabatt, changeRabatt] = useState('0.010');
  const [datum, changeDatum] = useState(new Date());
  const [rating, setSelectedRating] = useState(4);
  const [homepage, changeHomepage] = useState('www.beispielverlag.de');
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>(['Fiktion', 'Abenteuer']);
  const [lieferbar, changeLieferbar] = useState(true);
  const [errors, setErrors] = useState({
    isbn: '',
    titel: '',
    untertitel: '',
    preis: '',
    rabatt: '',
    homepage: '',
    rating: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    let errors = {};
  
    const isbnPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    if (!isbn || !isbnPattern.test(isbn)) {
      errors.isbn = 'Bitte geben Sie eine gültige ISBN ein';
    }
    if (!titel || typeof titel !== 'string') {
      errors.titel = 'Der Titel muss ein String sein';
    }    
    if (!untertitel || typeof untertitel !== 'string') {
      errors.untertitel = 'Bitte geben Sie einen gültigen Untertitel ein';
    }
    const preisPattern = /^\d+\.\d{2}$/;
    if (!preis) {
      errors.preis = 'Preis ist erforderlich!';
    } else if (parseFloat(preis) <= 0) {
      errors.preis = 'Preis muss größer als 0 sein!';
    } else if (!preisPattern.test(preis)) {
      errors.preis = 'Preis bitte mit 2 Nachkommastellen angeben!';
    }
    const rabattPattern = /^(0(\.\d{1,4})?|1(\.0{1,4})?)$/;
    if (!rabatt) {
      errors.rabatt = 'Rabatt ist erforderlich!';
    } else if (!rabattPattern.test(rabatt)) {
      errors.rabatt = 'Rabatt muss zwischen 0 und 1 liegen und darf maximal 4 Nachkommastellen haben!';
    }
    if (!rating || rating < 0 || rating > 5 || !Number.isInteger(rating)) {
      errors.rating = 'Die Bewertung muss eine Ganzzahl zwischen 0 und 5 sein';
    }
    const homepagePattern = /^(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if (!homepage || typeof homepage !== 'string') {
      errors.homepage = 'Homepage ist erforderlich!';
    } else if (!homepagePattern.test(homepage)) {
      errors.homepage = 'Bitte geben Sie eine gültige Homepage-URL ein!';
    }
    
    setErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      // Nur wenn keine Validierungsfehler vorhanden sind, die Daten senden
      const formData = {
        isbn,
        titel: { titel, untertitel },
        buchArt,
        preis: parseFloat(preis),
        rabatt: parseFloat(rabatt),
        datum: datum.toISOString(),
        rating: parseInt(rating),
        homepage,
        schlagwoerter,
        lieferbar,
      };
  
      const getAccessToken = (): string | null => {
        return localStorage.getItem('access_token');
      };
      const token = getAccessToken();
  
      try {
        // Hier wird die postBuch-Funktion aufgerufen
        const response = await postBuch(formData, token);
        if (response && response === 201) {
          alert('Buch erfolgreich erstellt!');
        } else {
          throw new Error('Fehler beim Erstellen des Buchs');
        }
      } catch (error) {
        console.error('Fehler:', error);
        alert('Fehler beim Erstellen des Buches');
      }
    }
  };
  
  const handleBuchArtChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeBuchArt(event.target.value);
  };

  const displayStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          onClick={() => setSelectedRating((i + 1).toString())}
          color={i < parseInt(rating) ? "teal.500" : "gray.300"} 
          boxSize={"20px"}
        />
      );
    }
    return stars;
  };
  const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
    <Input onClick={onClick} ref={ref} value={value} />
  ));
  CustomInput.displayName = 'CustomInput';

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxWidth={'60%'} >
      <Box > 
        <label htmlFor="isbn">ISBN:</label>
        <Input
          id="isbn"
          placeholder="z.B. 978-3-897-22583-1"
          value={isbn}
          onChange={(e) => changeIsbn(e.target.value)}
        />
        {errors.isbn && <Text color="red.500">{errors.isbn}</Text>}
      </Box>
      <Box>
        <label htmlFor="titel">Titel:</label>
        <Input
          id="titel"
          placeholder="z.B. Alpha"
          value={titel}
          onChange={(e) => changeTitel(e.target.value)}
        />
        {errors.titel && <Text color="red.500">{errors.titel}</Text>}
      </Box>
      <Box>
        <label htmlFor="untertitel">Untertitel:</label>
        <Input
          id="untertitel"
          placeholder="z.B. alpha"
          value={untertitel}
          onChange={(e) => changeUntertitel(e.target.value)}
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
          onChange={handleBuchArtChange}
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
          onChange={(e) => changePreis(e.target.value)}
        />
        {errors.preis && <Text color="red.500">{errors.preis}</Text>}
      </Box>
      <Box>
        <label htmlFor="rabatt">Rabatt(%):</label>
        <Input
          id="rabatt"
          placeholder="z.B. 1.1"
          value={rabatt}
          onChange={(e) => changeRabatt(e.target.value)}
        />
        {errors.rabatt && <Text color="red.500">{errors.rabatt}</Text>}
      </Box>
      <Box mt={4} mb={4}>
        <Text mb={2}>Datum:</Text>
        <DatePicker
          selected={datum}
          onChange={(date: Date) => changeDatum(date)}
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
        {errors.selectedRating && <Text color="red.500">{errors.selectedRating}</Text>}
      </Box>
      <Box>
        <label htmlFor="homepage">Homepage:</label>
        <Input
          id="homepage"
          placeholder="z.B. acme.at"
          value={homepage}
          onChange={(e) => changeHomepage(e.target.value)}
        />
         {errors.homepage && <Text color="red.500">{errors.homepage}</Text>}
      </Box>
      <Box>
        <label htmlFor="schlagwoerter">Schlagwörter:</label>
        <Input
          id="schlagwoerter"
          placeholder="z.B. JAVASCRIPT,TYPESCRIPT"
          value={schlagwoerter.join(', ')}
          onChange={(e) => setSchlagwoerter(e.target.value.split(', '))}
        />
      </Box>
      <Checkbox
        mt={2}
        isChecked={lieferbar}
        onChange={(e) => changeLieferbar(e.target.checked)}
      >
        Lieferbar
      </Checkbox>
      <Button type="submit" className="submit-button">
        Neues Buch erstellen
      </Button>
    </Box>
    
  );
}; 
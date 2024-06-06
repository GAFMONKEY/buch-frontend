import React, { useState } from 'react';
import { Input, Checkbox, Button, Box, Stack, Select, Flex, Text } from "@chakra-ui/react";
import './NewBook.css';
import { StarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewBook() {
  const [isbn, changeIsbn] = useState('978-3-16-148410-0');
  const [titel, changeTitel] = useState('Beispielbuch');
  const [untertitel, changeUntertitel] = useState('Eine Beispielgeschichte');
  const [buchArt, changeBuchArt] = useState('DRUCKAUSGABE');
  const [preis, changePreis] = useState('19.99');
  const [rabatt, changeRabatt] = useState('10');
  const [datum, changeDatum] = useState(new Date());
  const [selectedRating, setSelectedRating] = useState('4');
  const [homepage, changeHomepage] = useState('www.beispielverlag.de');
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>(['Fiktion', 'Abenteuer']);
  const [lieferbar, changeLieferbar] = useState(true);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let errors = {
      isbn: '',
      titel: '',
      untertitel: '',
      preis: '',
      rabatt: '',
      homepage: '',
      selectedRating: '',
    };

  const isbnPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    if (!isbn || !isbnPattern.test(isbn)) {
      errors.isbn = 'Bitte geben Sie eine gültige ISBN ein';
    }
    if (!titel) {
      errors.titel = 'Bitte geben Sie einen Titel ein';
    }
    if (!untertitel) {
      errors.untertitel = 'Bitte geben Sie einen Untertitel ein';
    }
    const preisPattern = /^\d+\.\d{2}$/;
    if (!preis) {
      errors.preis = 'Preis ist erforderlich!';
    } else if (parseFloat(preis) <= 0) {
      errors.preis = 'Preis muss größer als 0 sein!';
    } else if (!preisPattern.test(preis)) {
      errors.preis = 'Preis bitte mit 2 Nachkommastellen angeben!';
    }
    const rabattPattern = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;
    if (!rabatt) {
      errors.rabatt = 'Rabatt ist erforderlich!';
    } else if (!rabattPattern.test(rabatt)) {
      errors.rabatt = 'Rabatt muss zwischen 0 und 100 liegen und darf maximal 2 Nachkommastellen haben!';
    }
    if (!selectedRating) {
      errors.selectedRating = 'Bitte geben Sie eine Bewertung ein';
    }
    const homepagePattern = /^(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if (!homepage) {
      errors.homepage = 'Homepage ist erforderlich!';
    } else if (!homepagePattern.test(homepage)) {
      errors.homepage = 'Bitte geben Sie eine gültige Homepage-URL ein!';
    }

  };


  const displayStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          onClick={() => setSelectedRating((i + 1).toString())}
          color={i < parseInt(selectedRating) ? "teal.500" : "gray.300"}
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

  const handleBuchArtChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeBuchArt(event.target.value);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxWidth={'60%'}>
      <Box>
        <label htmlFor="isbn">ISBN:</label>
        <Input
          id="isbn"
          placeholder="z.B. 978-3-16-148410-0"
          value={isbn}
          onChange={(e) => changeIsbn(e.target.value)}
        />
        {errors.isbn && <Text color="red.500">{errors.isbn}</Text>}
      </Box>
      <Box>
        <label htmlFor="titel">Titel:</label>
        <Input
          id="titel"
          placeholder="z.B. Beispielbuch"
          value={titel}
          onChange={(e) => changeTitel(e.target.value)}
        />
        {errors.titel && <Text color="red.500">{errors.titel}</Text>}
      </Box>
      <Box>
        <label htmlFor="untertitel">Untertitel:</label>
        <Input
          id="untertitel"
          placeholder="z.B. Eine Beispielgeschichte"
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
          placeholder="z.B. 19.99"
          value={preis}
          onChange={(e) => changePreis(e.target.value)}
        />
        {errors.preis && <Text color="red.500">{errors.preis}</Text>}
      </Box>
      <Box>
        <label htmlFor="rabatt">Rabatt(%):</label>
        <Input
          id="rabatt"
          placeholder="z.B. 10"
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
        {errors.selectedRating && (
          <Text color="red.500">{errors.selectedRating}</Text>
        )}
      </Box>
      <Box>
        <label htmlFor="homepage">Homepage:</label>
        <Input
          id="homepage"
          placeholder="z.B. www.beispielverlag.de"
          value={homepage}
          onChange={(e) => changeHomepage(e.target.value)}
        />
        {errors.homepage && <Text color="red.500">{errors.homepage}</Text>}
      </Box>
      <Box>
        <label htmlFor="schlagwoerter">Schlagwörter:</label>
        <Input
          id="schlagwoerter"
          placeholder="z.B. Fiktion, Abenteuer"
          value={schlagwoerter.join(', ')}
          onChange={(e) => setSchlagwoerter(e.target.value.split(', '))}
        />
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Checkbox
          isChecked={lieferbar}
          onChange={(e) => changeLieferbar(e.target.checked)}
        >
          Lieferbar
        </Checkbox>
        <Button type="submit" ml={705} minWidth="auto">
          Neues Buch erstellen
        </Button>
      </Box>
    </Box>
  );
}

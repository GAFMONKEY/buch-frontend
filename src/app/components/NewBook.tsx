import React, { useState } from 'react';
import { Input, Checkbox, Button, Box, Stack, Select, Flex, Text } from "@chakra-ui/react";
import './NewBook.css';
import { StarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function NewBook() {
  const [isbn, changeIsbn] = useState('');
  const [titel, changeTitel] = useState('');
  const [untertitel, changeUntertitel] = useState('');
  const [buchArt, changeBuchArt] = useState('');
  const [preis, changePreis] = useState('');
  const [rabatt, changeRabatt] = useState('');
  const [datum, changeDatum] = useState(new Date());
  const [selectedRating, setSelectedRating] = useState('');
  const [homepage, changeHomepage] = useState('');
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [lieferbar, changeLieferbar] = useState(true);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isbnPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    if (!isbn || !isbnPattern.test(isbn)) {
      alert('Bitte geben Sie eine gültige ISBN ein');
      return;
    }
    if (!titel) {
      alert('Bitte geben Sie einen Titel ein');
      return;
    }
    if (!untertitel) {
      alert('Bitte geben Sie einen Untertitel ein');
      return;
    }
    const preisPattern = /^\d+\.\d{2}$/;
    if (!preis) {
      alert('Preis ist erforderlich!');
      return;
    } else if (parseFloat(preis) <= 0) {
      alert('Preis muss größer als 0 sein!');
      return;
    } else if (!preisPattern.test(preis)) {
      alert('Preis bitte mit 2 Nachkommastellen angeben!');
      return;
    }
    const rabattPattern = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;
    if (!rabatt) {
      alert('Rabatt ist erforderlich!');
      return;
    } else if (!rabattPattern.test(rabatt)) {
      alert('Rabatt muss zwischen 0 und 100 liegen und darf maximal 2 Nachkommastellen haben!');
      return;
    }
    if (!selectedRating) {
      alert('Bitte geben Sie eine Bewertung ein');
      return;
    }
    const homepagePattern = /^(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if (!homepage) {
      alert('Homepage ist erforderlich!');
      return;
    } else if (!homepagePattern.test(homepage)) {
      alert('Bitte geben Sie eine gültige Homepage-URL ein!');
      return;
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
          placeholder="z.B. 978-3-897-22583-1"
          value={isbn}
          onChange={(e) => changeIsbn(e.target.value)}
        />
      </Box>
      <Box>
        <label htmlFor="titel">Titel:</label>
        <Input
          id="titel"
          placeholder="z.B. Alpha"
          value={titel}
          onChange={(e) => changeTitel(e.target.value)}
        />
      </Box>
      <Box>
        <label htmlFor="untertitel">Untertitel:</label>
        <Input
          id="untertitel"
          placeholder="z.B. alpha"
          value={untertitel}
          onChange={(e) => changeUntertitel(e.target.value)}
        />
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
      </Box>
      <Box>
        <label htmlFor="rabatt">Rabatt(%):</label>
        <Input
          id="rabatt"
          placeholder="z.B. 1.1"
          value={rabatt}
          onChange={(e) => changeRabatt(e.target.value)}
        />
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
      </Box>
      <Box>
        <label htmlFor="homepage">Homepage:</label>
        <Input
          id="homepage"
          placeholder="z.B. https://acme.at"
          value={homepage}
          onChange={(e) => changeHomepage(e.target.value)}
        />
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
}
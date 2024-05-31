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
    // Hier können Sie den Code zum Speichern des neuen Buches in Ihrer Datenbank hinzufügen
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
      <Input
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => changeIsbn(e.target.value)}
      />
      <Input
        placeholder="Titel"
        value={titel}
        onChange={(e) => changeTitel(e.target.value)}
      />
      <Input
        placeholder="Untertitel"
        value={untertitel}
        onChange={(e) => changeUntertitel(e.target.value)}
      />
      <Box>
        <label htmlFor="buchArt">Buchart:</label>
        <Select
          id="buchArt"
          name="buchArt"
          placeholder="Art des Buches"
          value={buchArt}
          onChange={handleBuchArtChange}
          required
        >
          <option value="KINDLE">KINDLE</option>
          <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
        </Select>
      </Box>
      <Input
        placeholder="Preis"
        value={preis}
        onChange={(e) => changePreis(e.target.value)}
      />
      <Input
        placeholder="Rabatt"
        value={rabatt}
        onChange={(e) => changeRabatt(e.target.value)}
      />
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
      <Input
        placeholder="Homepage"
        value={homepage}
        onChange={(e) => changeHomepage(e.target.value)}
      />
      <Input
        placeholder="Schlagwörter"
        value={schlagwoerter.join(', ')}
        onChange={(e) => setSchlagwoerter(e.target.value.split(', '))}
      />
      <Checkbox mt={2}
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
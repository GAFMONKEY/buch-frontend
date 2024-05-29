import React, { useState } from 'react';
import { Input, Checkbox, Button, Box, Stack, Select } from "@chakra-ui/react";
import './NewBook.css';
import { StarIcon } from "@chakra-ui/icons";


export default function NewBook() {
  const [isbn, changeIsbn] = useState('');
  const [titel, changeTitel] = useState('');
  const [untertitel, changeUntertitel] = useState('');
  const [buchArt, changeBuchArt] = useState('');
  const [preis, changePreis] = useState('');
  const [rabatt, changeRabatt] = useState('');
  const [datum, changeDatum] = useState('');
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
          color={i < parseInt(selectedRating) ? "teal.500" : "gray.300"} // Convert selectedRating to a number using parseInt()
        />
      );
    }
    return stars;
  };
  
  const handleBuchArtChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeBuchArt(event.target.value);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Input placeholder="ISBN" value={isbn} onChange={(e) => changeIsbn(e.target.value)} />
      <Input placeholder="Titel" value={titel} onChange={(e) => changeTitel(e.target.value)} />
      <Input placeholder="Untertitel" value={untertitel} onChange={(e) => changeUntertitel(e.target.value)} />
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
      <Input placeholder="Preis" value={preis} onChange={(e) => changePreis(parseFloat(e.target.value))} />
      <Input placeholder="Rabatt" value={rabatt} onChange={(e) => changeRabatt(parseFloat(e.target.value))} />
      <Input placeholder="Datum" value={datum} onChange={(e) => changeDatum(e.target.value)} />
      <Box>
        Bewertung:
        <Stack direction="row" mb={4}>
          {displayStars()}
        </Stack>
      </Box>
      <Input placeholder="Homepage" value={homepage} onChange={(e) => changeHomepage(e.target.value)} />
      <Input placeholder="Schlagwörter" value={schlagwoerter.join(', ')} onChange={(e) => setSchlagwoerter(e.target.value.split(', '))} />
      <Checkbox isChecked={lieferbar} onChange={(e) => changeLieferbar(e.target.checked)}>Lieferbar</Checkbox>
      <Button type="submit" className="submit-button">Neues Buch erstellen</Button>
    </Box>
  );
}
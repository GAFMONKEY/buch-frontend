'use client';

import React, { useState } from 'react';
import NewBook from '../components/NewBook';
import withAuth from '../hoc/withAuth';

const Create = ()=> {
  const [inputValue, setInputValue] = useState('');

  const handleCreate = () => {
    if (inputValue.trim() === '') {
      alert('Eingabe darf nicht leer sein');
      return;
    }

    // Hier können Sie den Code zum Erstellen des Elements hinzufügen
    const buchDaten = {
      isbn: formData.get('isbn'),
      rating: Number.parseInt(formData.get('rating')?.toString() || ''),
      art: formData.get('buchArt'),
      preis: Number.parseFloat(formData.get('preis')?.toString() || ''),
      rabatt: Number.parseFloat(formData.get('rabatt')?.toString() || ''),
      lieferbar: formData.get('lieferbar') === 'on',
      datum: formData.get('datum'),
      homepage: formData.get('homepage'),
      schlagwoerter: schlagwoerterArray,
      titel: {
        titel: formData.get('titel'),
        untertitel: formData.get('untertitel'),
      },
      abbildungen: [
        {
          beschriftung: 'Abb. 1',
          contentType: 'img/png',
        },
      ],
    };
    alert(`Element "${inputValue}" wurde erstellt`);
    setInputValue('');
  };

  return (
    <div>
      <main>
        <NewBook />
      </main>
    </div>
  );
}

export default withAuth(Create);
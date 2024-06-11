type Buch = {
    isbn: string;
    rating: number;
    art: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    schlagwoerter: string[];
    titel: {
      titel: string;
      untertitel: string;
    };
    _links: {
      self: {
          href: string;      
      };
    };
};

type Buecher = {
  _embedded: {
    buecher: Buch[];
  }
}
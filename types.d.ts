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

type BookErrors = {
  isbn: string;
  titel: string;
  untertitel: string;
  preis: string;
  rabatt: string;
  homepage: string;
  rating: string;
}

type BuchArt = 'DRUCKAUSGABE' | 'KINDLE';

type Buecher = {
  _embedded: {
    buecher: Buch[];
  }
}

type BuchResponse = {
  body: Buch, eTag: string
};
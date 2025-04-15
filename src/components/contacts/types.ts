
export type ContactFormData = {
  nome: string;
  email: string;
  telefono: string;
  citta: string;
  tipo: string;
  fonte: string;
  indirizzo: string;
  cap: string;
  provincia: string;
  website: string;
  dataContatto: string;
  note: string;
};

export type ContactType = 'clienti' | 'fornitori' | 'partner';

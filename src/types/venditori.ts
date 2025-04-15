
export interface Venditore {
  id: string;
  user_id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono?: string;
  created_at: string;
}

export interface VenditoreFormValues {
  nome: string;
  cognome: string;
  email: string;
  telefono?: string;
}

// Questa è una versione semplificata per simulare l'interazione con il database
// poiché attualmente la tabella 'venditori' non esiste ancora in Supabase
export const mockVenditori: Venditore[] = [
  {
    id: '1',
    user_id: 'user-1',
    nome: 'Mario',
    cognome: 'Bianchi',
    email: 'mario.bianchi@esempio.it',
    telefono: '+39 123 456 7890',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'user-2',
    nome: 'Lucia',
    cognome: 'Verdi',
    email: 'lucia.verdi@esempio.it',
    telefono: '+39 098 765 4321',
    created_at: new Date().toISOString()
  }
];

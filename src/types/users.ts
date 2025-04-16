
export interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'admin' | 'operatore' | 'venditore';
  data_creazione: string;
  telefono?: string;
}

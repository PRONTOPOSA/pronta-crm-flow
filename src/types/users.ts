
export interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'admin' | 'operatore';
  data_creazione: string;
}

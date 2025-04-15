
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

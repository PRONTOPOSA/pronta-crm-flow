
import type { User } from '@/types/users';

export interface VenditoreFormData {
  nome: string;
  cognome: string;
  email: string;
  password: string;
}

export type VenditoreWithProfile = User;

// This is for backward compatibility with the existing code
export interface Venditore {
  id: string;
  nome: string;
  cognome: string;
  email: string;
}

// Mock data for VenditoreSelect component
export const mockVenditori: Venditore[] = [
  {
    id: "1",
    nome: "Mario",
    cognome: "Rossi",
    email: "mario.rossi@example.com"
  },
  {
    id: "2",
    nome: "Giuseppe",
    cognome: "Verdi",
    email: "giuseppe.verdi@example.com"
  },
  {
    id: "3",
    nome: "Anna",
    cognome: "Bianchi",
    email: "anna.bianchi@example.com"
  }
];

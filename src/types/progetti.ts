
export type BasePreventivoItem = {
  id: string;
  cliente: string;
  descrizione: string;
  valore: string;
}

export type PreventivoItem = BasePreventivoItem & {
  data: string;
  scadenza: string;
  tipo: 'preventivo';
}

export type ApprovatoItem = BasePreventivoItem & {
  data: string;
  inizio: string;
  tipo: 'approvato';
}

export type InCorsoItem = BasePreventivoItem & {
  inizio: string;
  fine: string;
  stato: string;
  tipo: 'in-corso';
}

export type CompletatoItem = BasePreventivoItem & {
  completato: string;
  fatturato: string;
  tipo: 'completato';
}

export type ProgettoItem = 
  | PreventivoItem 
  | ApprovatoItem 
  | InCorsoItem 
  | CompletatoItem;

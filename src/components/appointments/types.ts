
export interface AppointmentFormData {
  id: string;
  title: string;
  client: string;
  type: 'sopralluogo' | 'installazione' | 'riunione' | 'consegna';
  datetime: string;
  endtime: string;
  location: string;
  technician: string;
  notes: string;
  venditoreId?: string;
}

export type AppointmentType = 'sopralluogo' | 'installazione' | 'riunione' | 'consegna';


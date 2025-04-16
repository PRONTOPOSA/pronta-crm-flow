import { supabase } from "@/integrations/supabase/client";
import type { VenditoreFormData, VenditoreWithProfile } from "@/types/venditori";

export const fetchVenditori = async (): Promise<VenditoreWithProfile[]> => {
  console.log('Fetching vendors...');
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('ruolo', 'venditore')
    .order('data_creazione', { ascending: false });

  if (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }

  console.log('Fetched vendors:', data);
  
  // Cast the data to ensure the ruolo field is correctly typed
  const typedData = data?.map(item => ({
    ...item,
    ruolo: item.ruolo as 'admin' | 'operatore' | 'venditore'
  })) || [];
  
  return typedData;
};

export const checkExistingUser = async (email: string) => {
  const { data: existingUser, error: searchError } = await supabase
    .from('profiles')
    .select('id, email, ruolo')
    .eq('email', email)
    .maybeSingle();

  if (searchError) throw searchError;
  return existingUser;
};

export const updateUserRole = async (userId: string) => {
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ ruolo: 'venditore' })
    .eq('id', userId);

  if (updateError) throw updateError;
};

export const ensureVenditoreRecord = async (userId: string) => {
  // Check if the vendor record already exists
  const { data: venditoreExists, error: checkError } = await supabase
    .from('venditori')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (checkError) throw checkError;

  // If it doesn't exist, create a new vendor record
  if (!venditoreExists) {
    const { error: insertError } = await supabase
      .from('venditori')
      .insert({ user_id: userId });

    if (insertError) throw insertError;
    console.log('Created new vendor record for user:', userId);
  } else {
    console.log('Vendor record already exists for user:', userId);
  }
};

export const deleteVenditoreProfile = async (userId: string) => {
  // Prima eliminiamo il record dalla tabella venditori
  const { error: deleteVenditoreError } = await supabase
    .from('venditori')
    .delete()
    .eq('user_id', userId);

  if (deleteVenditoreError) throw deleteVenditoreError;

  // Poi aggiorniamo il ruolo dell'utente a operatore invece di eliminarlo completamente
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ ruolo: 'operatore' })
    .eq('id', userId);

  if (updateError) throw updateError;

  console.log('Venditore converted to operatore:', userId);
};

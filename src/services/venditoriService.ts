
import { supabase } from "@/integrations/supabase/client";
import type { VenditoreFormData, VenditoreWithProfile } from "@/types/venditori";

export const fetchVenditori = async (): Promise<VenditoreWithProfile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('ruolo', 'venditore')
    .order('data_creazione', { ascending: false });

  if (error) throw error;
  console.log('Venditori fetched:', data);
  return data || [];
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
  const { data: venditoreExists, error: checkError } = await supabase
    .from('venditori')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (!venditoreExists) {
    const { error: insertError } = await supabase
      .from('venditori')
      .insert({ user_id: userId });

    if (insertError) throw insertError;
  }
};

export const deleteVenditoreProfile = async (userId: string) => {
  const { error: deleteVenditoreError } = await supabase
    .from('venditori')
    .delete()
    .eq('user_id', userId);

  if (deleteVenditoreError) throw deleteVenditoreError;

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) throw error;
};

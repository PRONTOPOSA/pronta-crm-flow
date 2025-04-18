
import { supabase } from "@/integrations/supabase/client";
import type { VenditoreFormData, VenditoreWithProfile } from "@/types/venditori";

export const fetchVenditori = async (): Promise<VenditoreWithProfile[]> => {
  console.log('Fetching vendors...');
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      nome,
      cognome,
      email,
      ruolo,
      data_creazione,
      venditori (
        id
      )
    `)
    .eq('ruolo', 'venditore')
    .order('data_creazione', { ascending: false });

  if (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }

  // Only include users that have an entry in the venditori table
  const venditori = data?.filter(profile => profile.venditori?.length > 0) || [];
  console.log('Filtered vendors:', venditori);
  
  return venditori.map(profile => ({
    ...profile,
    ruolo: profile.ruolo as 'admin' | 'operatore' | 'venditore'
  }));
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
  console.log('Updated user role to venditore:', userId);
};

export const ensureVenditoreRecord = async (userId: string) => {
  // First, ensure the user has the venditore role
  await updateUserRole(userId);

  // Then create the vendor record
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
    console.log('Created new vendor record for user:', userId);
  } else {
    console.log('Vendor record already exists for user:', userId);
  }
};

export const deleteVenditoreProfile = async (userId: string) => {
  try {
    // First delete the venditore record
    const { error: deleteVenditoreError } = await supabase
      .from('venditori')
      .delete()
      .eq('user_id', userId);

    if (deleteVenditoreError) throw deleteVenditoreError;

    // Then update the user role back to operatore
    const { error: updateRoleError } = await supabase
      .from('profiles')
      .update({ ruolo: 'operatore' })
      .eq('id', userId);

    if (updateRoleError) throw updateRoleError;

    console.log('Successfully downgraded venditore profile:', userId);
    return true;
  } catch (error) {
    console.error('Error deleting venditore:', error);
    throw error;
  }
};

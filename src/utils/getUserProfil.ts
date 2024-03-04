import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function getUserProfile(id: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore }); // Assure-toi que 'cookies' est correctement défini

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single(); // Utilise .single() si tu t'attends à un seul résultat

    if (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return null;
    }

    console.log('Profil:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
    return null;
  }
}

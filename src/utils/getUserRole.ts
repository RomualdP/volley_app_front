import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

type UserRole = {
  name: string;
};

export async function getUserRole(id: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', id)
      .single();

    if (error) throw new Error(error.message);
    const role = data.roles as unknown as UserRole; // Specify the correct type for the role variable
    return role.name;
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
    return null;
  }
}

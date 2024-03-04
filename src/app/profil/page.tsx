import Card from '@/src/components/Card';
import React from 'react';
import Image from 'next/image';
import photoSerge from '@/public/images/photoSerge.png';
import { getUserProfile } from '@/src/utils/getUserProfil';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getUserRole } from '@/src/utils/getUserRole';
import { redirect } from 'next/navigation';

async function Profil() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('user from profil', user);
  if (!user) {
    redirect('/login');
  }
  const profil = user ? await getUserProfile(user.id) : null;
  const role = user ? await getUserRole(user.id) : null;
  console.log('role', role);
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Image src={photoSerge} alt="photo de profil de Romuald" />
      </Card>
      <Card>
        <div className="flex flex-col gap-4">
          <p>
            <b>Prénom</b> {profil?.firstname || 'Non renseigné'}
          </p>
          <p>
            <b>Nom</b> {profil?.lastname || 'Non renseigné'}
          </p>
          <p>
            <b>Role</b> {role || 'Non trouvé'}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Profil;

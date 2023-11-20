import Card from '@/components/Card'
import React from 'react'
import Image from 'next/image'
import photoSerge from '@/public/images/photoSerge.png'
import { getUserProfile } from '@/utils/getUserProfil'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { get } from 'http'
import { getUserRole } from '@/utils/getUserRole'

async function Profil() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const profil = user ? await getUserProfile(user.id) : null;
  const role = user ? await getUserRole(user.id) : null;
  console.log('role', role)
  return (
    <div className='flex flex-col gap-4'>
        <Card>
            <Image src={photoSerge} alt='photo de profil de Romuald' />
        </Card>
        <Card>
            <div className='flex flex-col gap-4'>
                <p><b>Prénom</b> {profil?.firstname || 'Non renseigné'}</p>
                <p><b>Nom</b> {profil?.lastname || 'Non renseigné'}</p>
            </div>
        </Card>
    </div>
  )
}

export default Profil
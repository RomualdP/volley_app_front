import Card from '@/components/Card'
import React from 'react'
import Image from 'next/image'
import photoSerge from '@/public/images/photoSerge.png'
import { User } from '@supabase/supabase-js'
import { getUserProfil } from '@/utils/getUserProfil'

function Profil() {


  return (
    <div className='flex flex-col gap-4'>
        <Card>
            <Image src={photoSerge} alt='photo de profil de Romuald' />
        </Card>
        <Card>
            <div className='flex flex-col gap-4'>
                <p><b>Prénom</b> Romuald</p>
                <p><b>Nom</b> Piquet</p>
                <p><b>Lieu</b> 23, rue d'orgemont à Lagny</p>
                <p><b>Spécialité</b> Apéro</p>
            </div>
        </Card>
    </div>
  )
}

export default Profil
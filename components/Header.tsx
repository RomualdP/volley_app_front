'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import VolleyAppLogo from '@/components/logos/VolleyAppLogo'

function Header() {
    const pathname = usePathname()
    let title
    switch (pathname) {
        case '/profil':
            title = 'Profil'
            break;
        case '/event':
            title = 'Matchs'
            break;
        default:
            title = 'Accueil'
    }

  return (
    <div className='fixed top-0 bg-primary w-full justify-between flex h-24 border-b-8 border-white items-center px-4'>
        <VolleyAppLogo />
        <h1 className='font-anime-ace text-xl font-bold'>{title}</h1>
        <div>logout</div>
    </div>
  )
}

export default Header
import React from 'react'
import Image from 'next/image'
import volleyAppLogo from '@/public/images/volleyAppLogo.png'

function VolleyAppLogo() {
  return (
    <Image src={volleyAppLogo} width={52} height={52} alt='Logo application' />
  )
}

export default VolleyAppLogo
import React from 'react'

function Header() {
  return (
    <div className='fixed top-0 bg-primary w-full justify-between flex h-24 border-b-8 border-white items-center px-4'>
        <div>logo</div>
        <h1 className='font-anime-ace text-xl font-bold'>Header</h1>
        <div>logout</div>
    </div>
  )
}

export default Header
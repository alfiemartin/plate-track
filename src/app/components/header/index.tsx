'use client'
import { Link } from '@nextui-org/react'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-primary-300 p-4 flex justify-between'>
      <Link href='/'>🏠</Link>
      <h1 className='text-center flex-1'>Plater</h1>
    </header>
  )
}

export default Header
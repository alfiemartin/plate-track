'use client'
import { Link } from '@nextui-org/react'
import NextLink from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <header className='bg-primary-500 shadow p-4 flex justify-between'>
      <Link as={NextLink} href='/'>🏠</Link>
      <h1 className='text-center flex-1'>Plater</h1>
    </header>
  )
}

export default Header
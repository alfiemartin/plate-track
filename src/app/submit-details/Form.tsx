'use client';
import { Input } from '@nextui-org/react'
import React from 'react'

const Form = () => {
  return (
    <form className='w-96 mx-auto'>
    <Input variant='bordered' label='Number plate?' />
    <Input type='select' />
  </form>
  )
}

export default Form
'use client'
import { Button, ButtonGroup } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const JourneyStart = () => {
  return (
    <section className='flex justify-center'>
      <ButtonGroup size='lg' >
        <Button as={Link} href='/find-my-plate' color='primary'>Find my plate</Button>
        <Button as={Link} href='/submit-details' color='secondary'>Sumbit plate details</Button>
      </ButtonGroup>
    </section>
  )
}

export default JourneyStart
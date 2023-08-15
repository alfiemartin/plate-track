'use client'
import { Button, ButtonGroup, Link } from '@nextui-org/react'
import React from 'react'

const JourneyStart = () => {
  return (
    <section className='flex justify-center'>
      <ButtonGroup>
        <Button as={Link} href='/find-my-plate' color='primary'>Find my plate</Button>
        <Button as={Link} href='/submit-details' color='secondary'>Sumbit plate details</Button>
      </ButtonGroup>
    </section>
  )
}

export default JourneyStart
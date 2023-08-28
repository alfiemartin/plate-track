import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'

const IntroHero = () => {
  return (
    <div className='flex justify-between'>
      <Card>
        <CardHeader className='flex justify-center'>
          .1
        </CardHeader>
        <Divider />
        <CardBody>
          Submit info
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='flex justify-center'>
          .2
        </CardHeader>
        <Divider />
        <CardBody>
          Search for info on your vehicle
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='flex justify-center'>
          .3
        </CardHeader>
        <Divider />
        <CardBody>
          Contact original sumbitters
        </CardBody>
      </Card>
    </div>
  )
}

export default IntroHero
import { Button, ButtonProps } from '@nextui-org/react';
import React from 'react'

const ContinueButton = (props: ButtonProps) => {
  return (
    <Button
        variant="solid"
        className="w-full"
        {...props}
      >
        Continue
      </Button>
  )
}

export default ContinueButton
import React, { ReactNode, useCallback } from 'react'
import { carApiKey } from '../../lib/carApiKey';

const SetupCarApi = ({ children }: { children?: ReactNode }) => {
  useCallback(() => carApiKey(), [])()

  return (
    <>
      {children}
    </>
  )
}

export default SetupCarApi;

//we need to run this code for each request -- so we have the car api key in the global scope;
export const revalidate = 0;
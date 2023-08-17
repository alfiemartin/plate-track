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

export const revalidate = 0;
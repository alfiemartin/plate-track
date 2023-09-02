import ControlledSelect, { Option } from '@/components/forms/select/controlled-select'
import { usePlateFormContext } from '@/providers/form/form-provider'
import { convertToSelectOptions } from '@/utils/forms';
import React, { useEffect } from 'react'

const CarMakesField = () => {
  const [state] = usePlateFormContext();
  
  return (
    <div className='relative'>
      <ControlledSelect
      name="carMake"
      id="carMake"
      placeholder="Make"
      options={convertToSelectOptions(state.carMakes ?? [])}
    />
    </div>
  )
}

export default CarMakesField
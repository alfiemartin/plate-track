import ControlledSelect, { Option } from '@/components/forms/select/controlled-select'
import React from 'react'

const CarMakesField = ({ carMakes }: any) => {
  return (
    <ControlledSelect
    name="carMake"
    id="carMake"
    placeholder="Make"
    options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
  />
  )
}

export default CarMakesField
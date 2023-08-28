import ControlledSelect from '@/components/forms/select/controlled-select'
import React from 'react'

const CarModelsField = () => {
  return (
    <ControlledSelect
    name="carModel"
    id="carModel"
    placeholder="Model"
    isLoading={!!!carModels && !!formState.dirtyFields.carMake}
    options={carModels}
  />
  )
}

export default CarModelsField
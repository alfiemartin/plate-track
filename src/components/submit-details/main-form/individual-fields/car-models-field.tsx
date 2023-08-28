import ControlledSelect from '@/components/forms/select/controlled-select'
import { usePlateFormContext } from '@/providers/form/form-provider'
import { convertToSelectOptions } from '@/utils/forms';
import React from 'react'
import { useFormContext } from 'react-hook-form';

const CarModelsField = () => {
  const [state] = usePlateFormContext();
  const { formState } = useFormContext();

  return (
    <ControlledSelect
    name="carModel"
    id="carModel"
    placeholder="Model"
    isLoading={!!!state.carModels?.carModels && !!formState.dirtyFields.carMake}
    options={convertToSelectOptions(state.carModels?.carModels)}
  />
  )
}

export default CarModelsField
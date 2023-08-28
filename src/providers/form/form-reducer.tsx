import { ActionMap } from "@/utils/types";

interface CarModels {
  for: string;
  carModels: string[];
}

export interface PlateFormState {
  userAllowsEmail?: boolean;
  carModels?: CarModels;
  carMakes?: string[];
}

export enum PlateFormTypes {
  SetCarModels,
  ClearCarModels,
  ClearCarMakes,
  setCarMakes
}

export type PlateFormPayload = {
  [PlateFormTypes.SetCarModels]: CarModels;
  [PlateFormTypes.ClearCarModels]: never;
  [PlateFormTypes.setCarMakes]: string[];
  [PlateFormTypes.ClearCarMakes]: never;
};

export type PlateFormActions =
  ActionMap<PlateFormPayload>[keyof ActionMap<PlateFormPayload>];

const PlateFormReducer = (
  state: PlateFormState,
  action: PlateFormActions
): PlateFormState => {
  switch (action.type) {
    case PlateFormTypes.SetCarModels:
      return {
        ...state,
        carModels: action.payload,
      };
    case PlateFormTypes.setCarMakes:
      return {
        ...state,
        carMakes: action.payload,
      };
    case PlateFormTypes.ClearCarMakes:
      return {
        ...state,
        carMakes: undefined,
      };
    case PlateFormTypes.ClearCarModels:
      return {
        ...state,
        carModels: undefined,
      };
    default:
      return {
        ...state,
      };
  }
};

export default PlateFormReducer;

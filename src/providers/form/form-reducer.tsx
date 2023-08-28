import { ActionMap } from "@/utils/types";

interface CarModels {
  for: string;
  carModels: string[];
}

export interface PlateFormState {
  userAllowsEmail?: boolean;
  carModels?: CarModels;
}

export enum PlateFormTypes {
  SetCarModels,
  ClearCarModels,
}

export type PlateFormPayload = {
  [PlateFormTypes.SetCarModels]: CarModels;
  [PlateFormTypes.ClearCarModels]: never;
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

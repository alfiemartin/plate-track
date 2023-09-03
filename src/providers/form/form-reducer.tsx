import { FormNames } from "@/components/submit-details/main-form/form-types";
import { ActionMap } from "@/utils/types";

interface CarModels {
  for: string;
  carModels: string[];
}

interface Journey {
  dateHasBeenChosen?: boolean;
  inUseFields?: FormNames[];
  file?: File;
}

export interface PlateFormState {
  userAllowsEmail?: boolean;
  carModels?: CarModels;
  carMakes?: string[];
  journey?: Journey;
}

export enum PlateFormTypes {
  SetCarModels,
  ClearCarModels,
  ClearCarMakes,
  setCarMakes,
  SetJourneyDateChose,
  setInUseFields,
  setFile,
}

export type PlateFormPayload = {
  [PlateFormTypes.SetCarModels]: CarModels;
  [PlateFormTypes.ClearCarModels]: never;
  [PlateFormTypes.setCarMakes]: string[];
  [PlateFormTypes.ClearCarMakes]: never;
  [PlateFormTypes.SetJourneyDateChose]: boolean;
  [PlateFormTypes.setInUseFields]: FormNames[];
  [PlateFormTypes.setFile]: File;
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
    case PlateFormTypes.setInUseFields:
      return {
        ...state,
        journey: {
          ...state.journey,
          inUseFields: action.payload
        }
      };
    case PlateFormTypes.setFile:
      return {
        ...state,
        journey: {
          ...state.journey,
          file: action.payload
        }
      }
    case PlateFormTypes.SetJourneyDateChose:
      return {
        ...state,
        journey: {
          ...state.journey,
          dateHasBeenChosen: action.payload,
        },
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

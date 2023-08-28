"use client";
import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import PlateFormReducer, { PlateFormActions, PlateFormState } from "./form-reducer";

type PlateFormContext = [state: PlateFormState, dispatch: Dispatch<PlateFormActions>];

const PlateFormContext = createContext<PlateFormContext>(null as any);

export const usePlateFormContext = () => useContext(PlateFormContext);

const PlateFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(PlateFormReducer, {  });

  const contextValue = useMemo<PlateFormContext>(() => ([ state, dispatch ]), [state, dispatch]);

  return (
    <PlateFormContext.Provider value={contextValue}>{children}</PlateFormContext.Provider>
  );
};

export default PlateFormProvider;

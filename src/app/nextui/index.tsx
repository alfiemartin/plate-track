'use client';

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

const UIProvider = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export { UIProvider };
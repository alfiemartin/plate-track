import { cache } from "react";

export const getServerContext = cache(() => ({ carApiKey: '' }))
import { getCarApiToken } from "@/services/carapi";

 declare global {
  var carApiKey: string;
}

export const carApiKey = async () => {
  console.log('token refreshed by singleton')
  globalThis.carApiKey = globalThis.carApiKey ?? await getCarApiToken();
};

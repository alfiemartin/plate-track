import { getCarApiToken } from "@/services/carapi";

 declare global {
  var carApiKey: string;
}

export const carApiKey = async () => {
  console.log('token refreshed by singleton')
  console.log(globalThis.carApiKey);
  globalThis.carApiKey = globalThis.carApiKey ?? await getCarApiToken();
};

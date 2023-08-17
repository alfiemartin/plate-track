import { getCarApiToken } from "@/services/carapi";

 declare global {
  var carApiKey: string;
}

export const carApiKey = async () => {
  globalThis.logger?.info('token refreshed by singleton')
  globalThis.carApiKey = globalThis.carApiKey ?? await getCarApiToken();
};
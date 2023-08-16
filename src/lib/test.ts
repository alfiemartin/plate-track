import { getCarApiToken } from "@/services/carapi";

declare global {
  var carApiKey: string;
}

export const carApiKey = async () => {
  console.log('token refreshed by singleton')
  global.carApiKey = global.carApiKey ?? await getCarApiToken();
};

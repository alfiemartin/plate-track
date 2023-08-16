import { getCarApiToken } from "@/services/carapi";

declare global {
  var apiKey: string;
}

export const apiKey = async () => {
  console.log('token created by singleton')
  global.apiKey = global.apiKey ?? await getCarApiToken();
};

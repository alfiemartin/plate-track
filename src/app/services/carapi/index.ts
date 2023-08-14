const { CARAPI_URI, CARAPI_TOKEN, CARAPI_SECRET } = process.env;

const getCarApiToken = async () => {
  const response = await fetch(`${CARAPI_URI!}/api/auth/login`, {
    method: "POST",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    body: JSON.stringify({
      api_token: CARAPI_TOKEN,
      api_secret: CARAPI_SECRET,
    }),
  });

  const token = await response.text();
  return token;
};

export interface CarMakesResponse {
  data: [{ id: number; name: string }];
}

const carFetch = (url: string, token: string, method = 'GET') =>
  fetch(`${CARAPI_URI!}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorisation: token,
    },
    cache: "force-cache",
  });

const getCarMakes = async (token: string) => {
  const response = await carFetch('/api/makes', token);
  const models: CarMakesResponse = await response.json();

  return models;
};

const getCarModels = async (token: string) => {
  const response = await carFetch('/api/model', token);
  const models: CarMakesResponse = await response.json();
  
  return models;
};

export { getCarApiToken, getCarMakes };

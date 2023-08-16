export interface CarMakesResponse {
  data: { id: number; name: string }[];
}

export interface CarModelsResponse {
  data: [{ id: number; make_id: string; name: string }];
}

const getCarApiToken = async () => {
  const response = await fetch(`${process.env.CARAPI_URI!}api/auth/login`, {
    method: "POST",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    body: JSON.stringify({
      api_token: process.env.CARAPI_TOKEN,
      api_secret: process.env.CARAPI_SECRET,
    }),
  });

  console.log('token created');
  
  const token = await response.text();
  return token;
};

const carFetch = async (url: string, token: string, method = "GET") => {
  const response = await fetch(`${process.env.CARAPI_URI!}${url}`, {
    method,
    headers: {
      Authorization: token,
    },
    cache: "force-cache",
  });

  if(response.status !== 200) {
    throw new Error(`JWT Expired probs, ${response.status}`);
  }

  return response;
}

const getCarMakes = async (token: string) => {
  const response = await carFetch("api/makes", token);
  const models: CarMakesResponse = await response.json();

  return models;
};

const getCarModels = async (token: string, make: string) => {
  const response = await carFetch(`api/models?make=${make}&year=2020`, token);
  const models: CarModelsResponse = await response.json();

  return models;
};

export { getCarApiToken, getCarMakes, getCarModels, carFetch };

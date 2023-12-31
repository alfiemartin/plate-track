export interface CarMakesResponse {
  data: { id: number; name: string }[];
}

export interface CarModelsResponse {
  data: [{ id: number; make_id: string; name: string }];
}

const getCarApiToken = async () => {
  globalThis.logger?.info('Fetched new token');

  const response = await fetch(`${process.env.CARAPI_URI!}api/auth/login`, {
    method: "POST",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      api_token: process.env.CARAPI_TOKEN,
      api_secret: process.env.CARAPI_SECRET,
    }),
  });

  if(response.status !== 200) {
    globalThis.logger?.error({
      msg: 'Failed to fetch new car api token',
      statusCode: response.status
    });
    throw new Error('Failed to get car api token')
  }

  const token = await response.text();
  return token;
};

const carFetch = async (url: string, token: string, cache?: RequestCache, method = "GET") => {
  const response = await fetch(`${process.env.CARAPI_URI!}${url}`, {
    method,
    headers: {
      Authorization: token ?? (await getCarApiToken()),
    },
    cache: cache ?? "force-cache",
  });

  if (!response.ok) {
    globalThis.logger?.error({
      msg: 'Failed to fetch new car api token',
      statusCode: response.status
    });
    throw new Error("Failed to fetch");
  }

  return response.json();
};

const getCarMakes = async (token: string) => {
  const makes: CarMakesResponse = await carFetch("api/makes", token);
  return makes;
};

const getCarModels = async (token: string, make: string) => {
  const models = await carFetch(`api/models?make=${make}&year=2020`, token);
  return models;
};

export { getCarApiToken, getCarMakes, getCarModels, carFetch };

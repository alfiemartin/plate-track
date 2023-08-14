const { CARAPI_URI, CARAPI_TOKEN, CARAPI_SECRET  } = process.env;

const getCarApiToken = async () => {

  const response = await fetch(`${CARAPI_URI!}/api/auth/login`, {  
    method: 'POST',
    headers: {  
      'accept': 'text/plain',
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      api_token: CARAPI_TOKEN,
      api_secret: CARAPI_SECRET
    })
  })

  const token = await response.text();
  return token;
};

interface CarModelsResponse {
  data: [{ id: number; name: string }]
}

const getCarMakes = async (token: string) => {
  const response = await fetch(`${CARAPI_URI!}/api/makes`, {  
    method: 'GET',
    headers: {  
      'Content-Type': 'application/json',
      'Authorisation': token,
    },
    cache: 'force-cache',
  });

  const models: CarModelsResponse = await response.json();
  return models;
}

export { getCarApiToken, getCarMakes };
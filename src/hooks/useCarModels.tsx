import { CarModelsResponse } from "@/services/carapi";
import { useEffect, useState } from "react";

const useCarModels = (carMake: string) => {
  const [carModels, setCarModels] = useState<CarModelsResponse["data"]>()

  useEffect(() => {
    (async () => {
      const models: CarModelsResponse["data"] = await (
        await fetch(`/api/cars/models?make=${carMake}`)
      ).json();

      setCarModels(models)
    })();
  }, [carMake]);

  return carModels;
};

export default useCarModels;

import { useApi } from "./api";
import { useEffect, useState } from "react";
import { IDENTIFICATION_TYPES_ENDPOINT } from "../constants/endpoints";
import { IdentificationType } from "../interfaces/identification_type";

export function useFetchIdentificationTypes() {
  const api = useApi();
  const [idTypes, setIdTypes] = useState<IdentificationType[]>(
    []
  );

  useEffect(() => {
    const fetchIdTypes = async () => {
      const { data } = await api.get(IDENTIFICATION_TYPES_ENDPOINT.getIdentificationTypes);
      setIdTypes(data);
    };
    fetchIdTypes();
  }, []);

  return idTypes;
}

export function getIdentificationTypeById(IdList: IdentificationType[], id: number) {
  return IdList.find((type) => type.id === id);
}
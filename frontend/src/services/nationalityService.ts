import { useApi } from "./api";
import { useEffect, useState } from "react";
import { NATIONALITIES_ENDPOINT } from "../constants/endpoints";

export function useFetchNationalities() {
  const api = useApi();
  const [nationalities, setNationalities] = useState<string[]>([]);

  useEffect(() => {
    const fetchNationalities = async () => {
      const { data } = await api.get(
        NATIONALITIES_ENDPOINT.getNationalities
      );
      const n = data
        .map((country: any) => country.name.common)
        .sort((a: string, b: string) => a.localeCompare(b));
      setNationalities(n);
    };
    fetchNationalities();
    setNationalities(nationalities);
  }, []);
  return nationalities;
}

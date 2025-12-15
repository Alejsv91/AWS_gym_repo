import { useApi } from "./api";
import { useEffect, useState } from "react";

export function useFetchNationalities() {
  const api = useApi();
  const [nationalities, setNationalities] = useState<string[]>([]);

  useEffect(()=>{
    const fetchNationalities = async () => {
      const { data } = await api.get('https://restcountries.com/v3.1/all?fields=name,cca2');
      const n = data.map((country: any) => country.name.common);
      setNationalities(n);
    };
    fetchNationalities();
    setNationalities(nationalities);
  }, []); 
  return nationalities;
}

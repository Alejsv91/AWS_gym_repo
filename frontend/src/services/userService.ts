import { useApi } from "./api";
import { USER_ENDPOINT } from "../constants/endpoints";

export async function getUsers() {
  const api = useApi();
  const {data} = await api.get(USER_ENDPOINT.getUsers);
  return data; 
}

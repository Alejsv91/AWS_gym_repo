import { useApi } from "./api";
import { USER_ENDPOINT } from "../constants/endpoints";
import { useEffect, useState } from "react";
import { UserResponse } from "../interfaces/users";

export function useUsers() {
  const api = useApi();
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(()=> {
    const fetchUsers = async () => {
      const { data } = await api.get(USER_ENDPOINT.getUsers);
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return users; 
}

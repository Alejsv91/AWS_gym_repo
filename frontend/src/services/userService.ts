import { useApi } from "./api";
import { USER_ENDPOINT } from "../constants/endpoints";
import { useEffect, useState } from "react";
import { UserResponse } from "../interfaces/users";
import { mapUser } from "../utils/mappers";

export function useUsers() {
  const api = useApi();
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get(USER_ENDPOINT.getUsers);
      const mappedUsers = data.map(mapUser);
      setUsers(mappedUsers);
    };
    fetchUsers();
  }, []);
  return users;
}

export function useFetchUserById(id: string) {
  const api = useApi();
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUserById = async () => {
      {
        const { data } = await api.get(USER_ENDPOINT.getUserById(id));
        const mappedUser = mapUser(data);
        setUser(mappedUser);
      }
    };
    fetchUserById();
  }, []);
  return user;
}

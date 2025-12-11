import { useApi } from "./api";
import { USER_ENDPOINT } from "../constants/endpoints";
import { useEffect, useState } from "react";
import { UserResponse, UserUpdateRequest } from "../interfaces/users";
import { mapUser, toUserUpdateRequest } from "../utils/mappers";

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

export function useUpdateUser(id: string, userData: Partial<UserUpdateRequest>) {
  const api = useApi();

  const updateUser = async () => {
    const { data } = await api.put(USER_ENDPOINT.updateUser(id), toUserUpdateRequest(userData as UserResponse));
    return mapUser(data);
  };

  console.log("useUpdateUser called with:", id, userData);
  return updateUser;
}

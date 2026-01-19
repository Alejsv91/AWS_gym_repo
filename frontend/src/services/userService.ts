import { useApi } from "./api";
import { USER_ENDPOINT } from "../constants/endpoints";
import { useEffect, useState } from "react";
import {
  UserResponse,
  UserUpdateRequest,
  UserCreateRequest,
  UserCreate,
} from "../interfaces/users";
import {
  mapUser,
  toUserUpdateRequest,
  toCreateUserRequest,
} from "../utils/mappers";
import { AxiosError } from "axios";

export function useDeleteUser() {
  const api = useApi();

  const deleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const result = await api.delete(USER_ENDPOINT.deleteUser(id));
      if (result.status !== 204) {
        console.error("Failed to delete user:", result.status, result.data);
        alert("Failed to delete user.");
        return false;
      }
      console.log("Delete user result:", result);
      alert("User deleted successfully!");
      return result;
    }
    return false;
  };
  return deleteUser;
}

export function useUsers() {
  const api = useApi();
  const [users, setUsers] = useState<UserResponse[]>([]);

  const fetchUsers = async () => {
    const { data } = await api.get(USER_ENDPOINT.getUsers);
    const mappedUsers = data.map(mapUser);
    setUsers(mappedUsers);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return { users, refetch: fetchUsers };
}

export function useFetchUserById(id: string) {
  const api = useApi();
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUserById = async () => {
      {
        if (!id) return {} as UserResponse;
        const { data } = await api.get(USER_ENDPOINT.getUserById(id));
        const mappedUser = mapUser(data);
        setUser(mappedUser);
      }
    };
    fetchUserById();
  }, []);
  return user;
}

export function useUpdateUser(
  id: string,
  userData: Partial<UserUpdateRequest>
) {
  const api = useApi();
  const updateUser = async () => {
    try {
      const response = await api.put(
        USER_ENDPOINT.updateUser(id),
        toUserUpdateRequest(userData as UserResponse)
      );
      if (response.status !== 200) {
        console.error("Failed to update user:", response.status, response.data);
        throw new Error(`Update failed with status ${response.status}`);
      }
      alert("Changes saved!");
      return true;
    } catch (error: AxiosError | any) {
      getErrorMessage(error);
    }
  };
  console.log("useUpdateUser called with:", id, userData);
  return updateUser;
}

export function useCreateUser(userData: Partial<UserCreateRequest>) {
  const api = useApi();
  const createUser = async () => {
    try {
      const response = await api.post(
        USER_ENDPOINT.createUser,
        toCreateUserRequest(userData as UserCreate)
      );
      if (response.status !== 201) {
        console.error("Failed to create user:", response.status, response.data);
        throw new Error(`Creation failed with status ${response.status}`);
      }
      alert("User created successfully!");
      return true;
    } catch (error: AxiosError | any) {
      getErrorMessage(error);
    }
  };
  return createUser;
}

function getErrorMessage(error: AxiosError | any) {
  console.error("Creation error:", error);
  const message =
    error?.response?.data?.detail ||
    "An unexpected error occurred while processing your request.";
  alert(` ${message}`);
}

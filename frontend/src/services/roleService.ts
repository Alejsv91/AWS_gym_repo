// src/services/roleService.ts
import { useApi } from "./api";
import { useEffect, useState } from "react";
import { Role } from "../interfaces/role";
import { ROLE_ENDPOINTS } from "../constants/endpoints";

export function useRoles() {
  const api = useApi();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const { data } = await api.get(ROLE_ENDPOINTS.getRoles);
      setRoles(data);
    };
    fetchRoles();
  }, []);

  return roles;
}

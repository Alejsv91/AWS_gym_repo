// src/services/roleService.ts
import { useApi } from "./api";
import { useEffect, useState } from "react";
import { Role } from "../interfaces/role";
import { ROLE_ENDPOINTS } from "../constants/endpoints";

export function useRoles() {
  const api = useApi();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchRoles = async () => {
      const { data } = await api.get(ROLE_ENDPOINTS.getRoles);
      setRoles(data);
      setIsLoading(false);
    };
    fetchRoles();
  }, []);

  return {roles, isLoading};
}

export function useGetRoleById(id: string) {
  const api = useApi();
  const [role, setRole] = useState<Role | null>(null);
  const [isRoleLoading, setIsLoading] = useState<boolean>(true);
  const [loadingRoleMessage, setLoadingMessage] = useState<string>("Loading role details...");

  useEffect(() => {
    setIsLoading(true);
    const fetchRole = async () => {
      const { data } = await api.get(ROLE_ENDPOINTS.getRoleById(id));
      setRole(data);
      setIsLoading(false);
    };
    fetchRole();
  }, [id]);

  return { role, isRoleLoading, loadingRoleMessage };
}

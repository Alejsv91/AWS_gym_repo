// src/services/roleService.ts
import { useApi } from "./api";
import { useState } from "react";

export function useRoles() {
  const api = useApi();
  const [roles, setRoles] = useState<any[]>([]);

  const fetchRoles = async () => {
    const { data } = await api.get("/roles/");
    setRoles(data);
  };

  return { roles, fetchRoles };
}

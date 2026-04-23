import { useApi } from "./api";
import { useState, useEffect } from "react";
import { PermissionResponse } from "../interfaces/permission";
import { PERMISSION_ENDPOINTS } from "../constants/endpoints";


export function usePermissions() {
    // const api = useApi();
    // const [permissions, setPermissions] = useState<Permission[]>([]);
    // const [isLoading, setIsLoading] = useState<boolean>(true);
  
    // useEffect(() => {
    //   setIsLoading(true);
    //   const fetchPermissions = async () => {
    //     const { data } = await api.get(PERMISSION_ENDPOINTS.getPermissions);
    //     setPermissions(data);
    //     setIsLoading(false);
    //   };
    //   fetchPermissions();
    // }, []);
  
    return {permissions: [], isLoading: false};
  }

export function useGetPermissionsByRoleId(roleId: string) {
    const api = useApi();
    const [permissions, setPermissions] = useState<PermissionResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadingMessage, setLoadingMessage] = useState<string>("Loading permissions...");
  
    useEffect(() => {
      setIsLoading(true);
      const fetchPermissions = async () => {
        const { data } = await api.get(PERMISSION_ENDPOINTS.getPermissionsByRoleId(roleId));
        setPermissions(data);
        setIsLoading(false);
      };
      fetchPermissions();
    }, [roleId]);
  
    return { permissions, isLoading, loadingMessage };
  }
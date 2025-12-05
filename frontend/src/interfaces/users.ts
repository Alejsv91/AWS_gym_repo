import { Role } from "./role";
import { IdentificationType } from "./identification_type";

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  identificationType: IdentificationType;
  identificationNumber: string;
}

export interface UserRequest {
  id?: number; 
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  identificationTypeId: number;
  identificationNumber: string;
  phoneNumber: string;
  address?: string;
  nationality: string;
}

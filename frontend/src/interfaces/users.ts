import { Role } from "./role";
import { IdentificationType } from "./identification_type";

export interface UserBase {
  email: string;
  firstName: string;
  lastName: string;
  identificationNumber: string;
  phoneNumber: string;
  address: string;
  nationality: string;
}

export interface UserResponse extends UserBase {
  id?: number;
  role: Role;
  identificationType: IdentificationType;
}

export interface UserRequest extends UserBase{
  id: number; 
  email: string;
  roleId: number;
  identificationTypeId: number;
}

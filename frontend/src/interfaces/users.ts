import { Role } from "./role";
import { IdentificationType } from "./identification_type";

// User Response Interfaces

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

export interface UserUpdateRequest extends Partial<UserBase> {
  roleId?: number;
  identificationTypeId?: number;
}

// User Payload Interfaces
export interface UserUpdatePayload {
  email: string;
  first_name: string;
  last_name: string;
  id_number: string;
  phone_number: string;
  address: string;
  nationality: string; 
  role_id: number;
  identification_type_id: number;
}

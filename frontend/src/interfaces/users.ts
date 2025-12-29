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

export interface UserCreate extends UserBase{
  role: Role;
  identificationType: IdentificationType;
}

export interface UserResponse extends UserBase {
  id?: number;
  role: Role;
  identificationType: IdentificationType;
}

export interface UserDetails extends UserBase{
  id?: number;
  role: Role;
  identificationType: IdentificationType;
}

export interface UserRequest extends UserBase{
  id: number; 
  roleId: number;
  identificationTypeId: number;
}

export interface UserCreateRequest extends UserBase {
  roleId: number;
  identificationTypeId: number;
}

export interface UserUpdateRequest extends Partial<UserBase> {
  roleId?: number;
  identificationTypeId?: number;
}

// User Payload Interfaces
export interface UserPayloadBase {
  first_name: string;
  last_name: string;
  id_number: string;
  phone_number: string;
  email: string;
  address: string;
  nationality: string;
}

export interface UserCreatePayload extends UserPayloadBase {
  role_id: number;
  identification_type_id: number;
}

export interface UserUpdatePayload extends UserPayloadBase {
  role_id: number;
  identification_type_id: number;
}

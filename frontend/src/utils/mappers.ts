import { UserResponse } from "../interfaces/users";

export function mapUser(apiUser: any): UserResponse {
  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
    role: {
      id: apiUser.role.id,
      name: apiUser.role.name,
      description: apiUser.role.description
    },
    identificationType: {
      id: apiUser.identification_type.id,
      name: apiUser.identification_type.name,
      description: apiUser.identification_type.description
    },
    identificationNumber: apiUser.id_number,
  };
}
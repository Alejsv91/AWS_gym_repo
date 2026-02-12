import { UserCreatePayload, UserResponse, UserUpdatePayload } from "../interfaces/users";


export function mapUser(apiUser: any): UserResponse {
  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
    role: {
      id: apiUser.role.id,
      name: apiUser.role.name,
      description: apiUser.role.description,
    },
    identificationType: {
      id: apiUser.identification_type.id,
      name: apiUser.identification_type.name,
      description: apiUser.identification_type.description,
    },
    identificationNumber: apiUser.id_number,
    address: apiUser.address,
    nationality: apiUser.nationality,
    phoneNumber: apiUser.phone_number,
  };
}

export function mapDropdownOption(id: any, name: any) {
  return {
    id: id,
    name: name,
  };
}

export function toUserUpdateRequest(user: UserResponse): UserUpdatePayload{
  return {
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    id_number: user.identificationNumber,
    phone_number: user.phoneNumber,
    address: user.address,
    nationality: user.nationality,
    role_id: user.role.id,
    identification_type_id: user.identificationType.id
  }
}

export function toCreateUserRequest(user: UserResponse): UserCreatePayload {
  return {
    first_name: user.firstName,
    last_name: user.lastName,
    identification_type_id: user.identificationType.id,
    id_number: user.identificationNumber,
    phone_number: user.phoneNumber,
    email: user.email,
    address: user.address,
    role_id: user.role.id,
    nationality: user.nationality,
  }
}



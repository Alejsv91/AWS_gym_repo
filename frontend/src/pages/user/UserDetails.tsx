import { useParams } from "react-router-dom";
import { useFetchUserById } from "../../services/userService";
import { useFetchNationalities } from "../../services/nationalityService";
import { useRoles } from "../../services/roleService";
import React, { useEffect, useState } from "react";
import { UserResponse } from "../../interfaces/users";
import { mapDropdownOption } from "../../utils/mappers";
import SaveModalUsers from "../../components/users/saveModalUsers";
import { useUpdateUser } from "../../services/userService";
import { getIdTypeByLabel } from "../../constants/idTypes";
import {
  useFetchIdentificationTypes,
  getIdentificationTypeById,
} from "../../services/identificationType";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const userInfo = useFetchUserById(id!);
  const [userUpdate, setUserUpdate] = useState<UserResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const rawNationalities = useFetchNationalities();
  const roles = useRoles();
  const idTypes = useFetchIdentificationTypes();
  const nationalities = rawNationalities.map((n) => mapDropdownOption(n, n));
  const updateUser = useUpdateUser(id!, userUpdate!);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (userInfo) {
      setUserUpdate(userInfo);
    }
  }, [userInfo]);

  const inputs = [
    {
      label: "First Name",
      value: userUpdate ? userUpdate.firstName : "",
      type: "text",
      id: "firstName",
      updateFunction: updateInputValue,
      validationFunction: validateAlphabeticInput,
    },
    {
      label: "Last Name",
      value: userUpdate ? userUpdate.lastName : "",
      type: "text",
      id: "lastName",
      updateFunction: updateInputValue,
      validationFunction: validateAlphabeticInput,
    },
    {
      label: "Email",
      value: userUpdate ? userUpdate.email : "",
      type: "email",
      id: "email",
      updateFunction: updateInputValue,
      validationFunction: validateEmail,
    },
    {
      label: "Identification Number",
      value: userUpdate ? userUpdate.identificationNumber : "",
      type: "text",
      id: "identificationNumber",
      updateFunction: updateInputValue,
      validationFunction: validateIdNumber,
    },
    {
      label: "Phone Number",
      value: userUpdate ? userUpdate.phoneNumber : "",
      type: "text",
      id: "phoneNumber",
      updateFunction: updateInputValue,
      validationFunction: validatePhone,
    },
    {
      label: "Address",
      value: userUpdate ? userUpdate.address : "",
      type: "text",
      id: "address",
      updateFunction: updateInputValue,
    },
  ];

  const dropdowns = [
    {
      label: "Role",
      selectedValue: userUpdate ? userUpdate.role.name : "",
      options: roles,
      updateFunction: updateRoleDropdown,
      currentValue: userUpdate ? userUpdate.role.id : "",
    },
    {
      label: "Nationality",
      selectedValue: userUpdate ? userUpdate.nationality : "",
      options: nationalities,
      updateFunction: updateNationalityDropdown,
      currentValue: userUpdate ? userUpdate.nationality : "",
    },
    {
      label: "Identification Type",
      selectedValue: userUpdate ? userUpdate.identificationType.name : "",
      options: idTypes,
      updateFunction: updateIdentificationTypeDropdown,
      currentValue: userUpdate ? userUpdate.identificationType.id : "",
    },
  ];

  function validateIdNumber(id: string): string {
    const selectedIdType = getIdTypeByLabel(
      userUpdate?.identificationType.name || ""
    );
    const regex = selectedIdType?.regex;
    return regex?.test(id)
      ? ""
      : selectedIdType?.warningMessage || "Invalid ID format.";
  }

  function validateAlphabeticInput(name: string, label?: string): string {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(name)
      ? ""
      : `${label} can only contain letters and spaces.`;
  }

  function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? "" : "Invalid email format.";
  }

  function validatePhone(phone: string) {
    const regex = /^[0-9]{8,15}$/;
    return regex.test(phone) ? "" : "Phone number must be 8–15 digits.";
  }

  function updateRoleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserUpdate((prev) =>
      prev
        ? { ...prev, role: { ...prev.role, id: Number(e.target.value) } }
        : prev
    );
  }

  function updateIdentificationTypeDropdown(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const idValue = getIdentificationTypeById(idTypes, Number(e.target.value));
    setUserUpdate((prev) =>
      prev
        ? {
            ...prev,
            identificationType: {
              ...prev.identificationType,
              id: Number(idValue?.id),
              description: String(idValue?.description),
              name: String(idValue?.name),
            },
          }
        : prev
    );
    validateIdNumber(userUpdate?.identificationNumber || "");
  }

  function updateNationalityDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserUpdate((prev) =>
      prev ? { ...prev, nationality: e.target.value } : prev
    );
  }

  function updateInputValue(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserResponse
  ) {
    const value = e.target.value;
    setUserUpdate((prev) => (prev ? { ...prev, [field]: value } : prev));

    const inputDef = inputs.find((input) => input.id === field);
    if (inputDef?.validationFunction) {
      const errorMsg = inputDef.validationFunction(value, inputDef.label);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMsg,
      }));
    }
  }

  const handleSubmit = () => {
    updateUser();
    setShowModal(false); // close modal after saving
  };

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <form className="border p-3 rounded bg-light">
        {inputs.map((input, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">{input.label}</label>
            <input
              type={input.type}
              className={`form-control ${errors[input.id] ? "is-invalid" : ""}`}
              value={input.value}
              onChange={
                input.updateFunction
                  ? (e) =>
                      input.updateFunction(e, input.id as keyof UserResponse)
                  : undefined
              }
            />
            {errors[input.id] && (
              <div className="invalid-feedback">{errors[input.id]}</div>
            )}
          </div>
        ))}
        {dropdowns.map((dropdown, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">{dropdown.label}</label>
            <select
              className="form-select"
              value={dropdown.currentValue || ""}
              onChange={(e) =>
                dropdown.updateFunction ? dropdown.updateFunction(e) : undefined
              }
            >
              {dropdown.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Save Changes
          </button>
        </div>
      </form>
      <SaveModalUsers
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useFetchNationalities } from "../../services/nationalityService";
import { useRoles } from "../../services/roleService";
import { useState, useEffect, use } from "react";
import { UserCreate, UserResponse, UserDetails } from "../../interfaces/users";
import { mapDropdownOption } from "../../utils/mappers";
import SaveModalUsers from "./saveModalUsers";
import { useUpdateUser, useCreateUser } from "../../services/userService";
import { getIdTypeByLabel } from "../../constants/idTypes";
import {
  useFetchIdentificationTypes,
  getIdentificationTypeById,
} from "../../services/identificationType";
import { useFetchUserById } from "../../services/userService";
import { UserActions } from "../../constants/userActions";

interface FormUsersProps {
  userId?: string;
  userAction: UserActions;
}

export default function FormUser(formUserProps: FormUsersProps) {
  const { id } = useParams<{ id: string }>();
  const userInfo = useFetchUserById(id!);
  const [showModal, setShowModal] = useState(false);
  const rawNationalities = useFetchNationalities() || [];
  const roles = useRoles() || [];
  const idTypes = useFetchIdentificationTypes() || [];
  const nationalities = rawNationalities.map((n) => mapDropdownOption(n, n));
  const loading =
    nationalities.length === 0 || roles.length === 0 || idTypes.length === 0;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const updateUser = useUpdateUser(id!, userDetails!);
  const createUser = useCreateUser(userDetails!);
  const USER_ACTIONS = UserActions;
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setUserDetails(userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!loading && !initialized && !userInfo) {
      setUserDetails({
        firstName: "",
        lastName: "",
        email: "",
        identificationNumber: "",
        phoneNumber: "",
        address: "",
        role: roles[0] || { id: 0, name: "", description: "" },
        nationality: nationalities[0]?.name || "",
        identificationType: idTypes[0] || { id: 0, name: "", description: "" },
      });

      setInitialized(true);
    }
  }, [loading, initialized, userInfo]);

  const inputs = [
    {
      label: "First Name",
      value: userDetails ? userDetails.firstName : "",
      type: "text",
      id: "firstName",
      updateFunction: updateInputValue,
      validationFunction: validateAlphabeticInput,
    },
    {
      label: "Last Name",
      value: userDetails ? userDetails.lastName : "",
      type: "text",
      id: "lastName",
      updateFunction: updateInputValue,
      validationFunction: validateAlphabeticInput,
    },
    {
      label: "Email",
      value: userDetails ? userDetails.email : "",
      type: "email",
      id: "email",
      updateFunction: updateInputValue,
      validationFunction: validateEmail,
    },
    {
      label: "Identification Number",
      value: userDetails ? userDetails.identificationNumber : "",
      type: "text",
      id: "identificationNumber",
      updateFunction: updateInputValue,
      validationFunction: validateIdNumber,
    },
    {
      label: "Phone Number",
      value: userDetails ? userDetails.phoneNumber : "",
      type: "text",
      id: "phoneNumber",
      updateFunction: updateInputValue,
      validationFunction: validatePhone,
    },
    {
      label: "Address",
      value: userDetails ? userDetails.address : "",
      type: "text",
      id: "address",
      updateFunction: updateInputValue,
    },
  ];

  const dropdowns = [
    {
      label: "Role",
      selectedValue: userDetails ? userDetails.role.name : "",
      options: roles,
      updateFunction: updateRoleDropdown,
      currentValue: userDetails ? userDetails.role.id : roles[0]?.id,
    },
    {
      label: "Nationality",
      selectedValue: userDetails ? userDetails.nationality : "",
      options: nationalities,
      updateFunction: updateNationalityDropdown,
      currentValue: userDetails ? userDetails.nationality : "",
    },
    {
      label: "Identification Type",
      selectedValue: userDetails ? userDetails.identificationType.name : "",
      options: idTypes,
      updateFunction: updateIdentificationTypeDropdown,
      currentValue: userDetails ? userDetails.identificationType.id : "",
    },
  ];

  function validateIdNumber(id: string): string {
    const selectedIdType = getIdTypeByLabel(
      userDetails?.identificationType.name || ""
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
    setUserDetails((prev) =>
      prev
        ? { ...prev, role: { ...prev.role, id: Number(e.target.value) } }
        : prev
    );
  }

  function updateIdentificationTypeDropdown(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const idValue = getIdentificationTypeById(idTypes, Number(e.target.value));
    setUserDetails((prev) =>
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
  }

  function updateNationalityDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserDetails((prev) =>
      prev ? { ...prev, nationality: e.target.value } : prev
    );
  }

  function updateInputValue(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserResponse
  ) {
    const value = e.target.value;
    setUserDetails((prev) => (prev ? { ...prev, [field]: value } : prev));

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
    if (!userDetails) return;
    formUserProps.userAction === USER_ACTIONS.CREATE
      ? createUser()
      : updateUser();

    setShowModal(false); // close modal after saving
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <form className="border p-3 rounded bg-light">
        {dropdowns.map((dropdown, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">{dropdown.label}</label>
            <select
              className="form-select"
              value={dropdown.currentValue}
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
        {inputs.map((input, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">{input.label}</label>
            <input
              id={input.id}
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
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            {formUserProps.userAction === UserActions.CREATE
              ? "Create User"
              : "Update User"}
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

import { useParams } from "react-router-dom";
import { useFetchUserById } from "../../services/userService";
import { useFetchNationalities } from "../../services/nationalityService";
import { useRoles } from "../../services/roleService";
import React, { useEffect, useState } from "react";
import { UserResponse } from "../../interfaces/users";
import { mapDropdownOption } from "../../utils/mappers";
import  SaveModalUsers from "../../components/users/saveModalUsers";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const userInfo = useFetchUserById(id!);
  const [userUpdate, setUserUpdate] = useState<UserResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

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
    },
    {
      label: "Last Name",
      value: userUpdate ? userUpdate.lastName : "",
      type: "text",
      id: "lastName",
      updateFunction: updateInputValue,
    },
    {
      label: "Email",
      value: userUpdate ? userUpdate.email : "",
      type: "email",
      id: "email",
      updateFunction: updateInputValue,
    },
    {
      label: "Identification Number",
      value: userUpdate ? userUpdate.identificationNumber : "",
      type: "text",
      id: "identificationNumber",
      updateFunction: updateInputValue,
    },
    {
      label: "Phone Number",
      value: userUpdate ? userUpdate.phoneNumber : "",
      type: "text",
      id: "phoneNumber",
      updateFunction: updateInputValue,
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
      options: useRoles(),
      updateFunction: updateRoleDropdown,
      currentValue: userUpdate ? userUpdate.role.id : "",
    },
    {
      label: "Nationality",
      selectedVale: userUpdate ? userUpdate.nationality : "",
      options: useFetchNationalities().map((n) => mapDropdownOption(n, n)),
      updateFunction: updateNationalityDropdown,
      currentValue: userUpdate ? userUpdate.nationality : "",
    },
  ];

  function updateRoleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserUpdate((prev) =>
      prev
        ? { ...prev, role: { ...prev.role, id: Number(e.target.value) } }
        : prev
    );
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
  }

  const handleSubmit = () => {
    // Your save logic here
    alert("Changes saved!");
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
              className="form-control"
              value={input.value}
              onChange={
                input.updateFunction
                  ? (e) =>
                      input.updateFunction(e, input.id as keyof UserResponse)
                  : undefined
              }
            />
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
          <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
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

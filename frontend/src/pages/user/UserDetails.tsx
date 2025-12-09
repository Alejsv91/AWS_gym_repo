import { useParams } from "react-router-dom";
import { useFetchUserById } from "../../services/userService";
import { useFetchNationalities } from "../../services/nationalityService";
import { useRoles } from "../../services/roleService";
import { useEffect, useState } from "react";
import { UserResponse } from "../../interfaces/users";
import { mapDropdownOption } from "../../utils/mappers";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const userInfo = useFetchUserById(id!);
  const [userUpdate, setUserUpdate] = useState<UserResponse | null>(null);

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
    },
    {
      label: "Last Name",
      value: userUpdate ? userUpdate.lastName : "",
      type: "text",
    },
    {
      label: "Email",
      value: userUpdate ? userUpdate.email : "",
      type: "email",
    },
    {
      label: "Identification Number",
      value: userUpdate ? userUpdate.identificationNumber : "",
      type: "text",
    },
    {
      label: "Phone Number",
      value: userUpdate ? userUpdate.identificationNumber : "",
      type: "text",
    },
    {
      label: "Address",
      value: userUpdate ? userUpdate.address : "",
      type: "text",
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
      options: useFetchNationalities().map((n) => mapDropdownOption(n,n)),
      updateFunction: updateNationalityDropdown,
      currentValue: userUpdate ? userUpdate.nationality : "",
    }
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
      prev
        ? { ...prev, nationality: e.target.value }
        : prev
    );
  }

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
      </form>
    </div>
  );
}

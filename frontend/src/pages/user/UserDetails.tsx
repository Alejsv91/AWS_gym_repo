import { useParams } from "react-router-dom";
import { useFetchUserById } from "../../services/userService";
import { useFetchNationalities } from "../../services/nationalityService";
import { useRoles } from "../../services/roleService";
import { urlToHttpOptions } from "url";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const userInfo = useFetchUserById(id!);
  const nationalities = useFetchNationalities();
  const inputs = [
    {
      label: "First Name",
      value: userInfo ? userInfo.firstName : "",
      type: "text",
    },
    {
      label: "Last Name",
      value: userInfo ? userInfo.lastName : "",
      type: "text",
    },
    {
      label: "Email",
      value: userInfo ? userInfo.email : "",
      type: "email",
    },
    {
      label: "Identification Number",
      value: userInfo ? userInfo.identificationNumber : "",
      type: "text",
    },
    {
      label: "Phone Number",
      value: userInfo ? userInfo.identificationNumber : "",
      type: "text",
    },
    {
      label: "Address",
      value: userInfo ? userInfo.address : "",
      type: "text",
    }
  ];

  const dropdowns = [
    {
      label: "Role",
      selectedValue: userInfo ? userInfo.role.name : "",
      options: useRoles()
    }

  ];

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
              readOnly
            />
          </div>
        ))}
        {dropdowns.map((dropdown, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">{dropdown.label}</label>
            <select className="form-select" value={dropdown.selectedValue}>
              <option value="">{dropdown.selectedValue}</option>
              {dropdown.options.map((option) => (
                <option key={option.id} value={option.name}>
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

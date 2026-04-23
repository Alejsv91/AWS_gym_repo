import { useParams } from "react-router-dom";
import { useGetRoleById } from "../../services/roleService";
import { useState, useEffect } from "react";
import LoadingModal from "../Loading";
import { UserActions } from "../../constants/userActions";
import { useLocation } from "react-router-dom";
import { InputElement } from "../../interfaces/inputElement";
import Input from "../shared/Input";
import PermissionsTable from "../permissions/permissionTable";

export interface RoleFormProps {
  userAction: UserActions;
}

export default function RoleForm() {
  const location = useLocation();
  const { userAction } = location.state as RoleFormProps;
  const { id } = useParams<{ id: string }>();
  const { role, isRoleLoading, loadingRoleMessage } = useGetRoleById(id || "");
  const [actionMessage, setActionMessage] = useState("Loading");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isRoleLoading) {
      setActionMessage(loadingRoleMessage);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  });

  //inputs
  let inputs: InputElement[] = [
    {
      label: "Role Name",
      value: role?.name || "",
      type: "text",
      id: "role-name",
      updateFunction: () => {},
      validationFunction: () => {},
      isEditable: true,
      isVisible: true,
    },
    {
      label: "Description",
      value: role?.description || "",
      type: "text",
      id: "role-description",
      updateFunction: () => {},
      validationFunction: () => {},
      isEditable: true,
      isVisible: true,
    },
  ];

  return isLoading ? (
    LoadingModal({ isLoading, actionMessage })
  ) : (
    <>
      <div className="container mt-4 mb-4">
        <h2 className="mb-4">Role Details</h2>
        <form className="border p-3 rounded bg-light">
          {inputs.map((inputElement, index) => (
            <Input inputElement={inputElement} index={index} />
          ))}
          <div className="mb-3">
            <tr>
              <td>
                <button type="submit" className="btn btn-primary">
                  {userAction === UserActions.CREATE
                    ? "Create Role"
                    : "Update Role"}
                </button>
              </td>
              <td>
                <button className="btn btn-primary btn-danger">Cancel</button>
              </td>
            </tr>
          </div>
        </form>
        <div></div>
        <div className="mt-4">
          <PermissionsTable />
        </div>
      </div>
    </>
  );
}

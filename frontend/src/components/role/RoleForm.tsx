import { useParams } from "react-router-dom";
import { useGetRoleById } from "../../services/roleService";
import { useState, useEffect } from "react";
import LoadingModal from "../Loading";
import { UserActions } from "../../constants/userActions";
import { useLocation } from "react-router-dom";

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

  return isLoading ? (
    LoadingModal({ isLoading, actionMessage })
  ) : (
    <div>
      RoleForm {id} and role name is {role?.name}
      And the action is { userAction }
    </div>
  );
}

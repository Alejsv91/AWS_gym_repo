import { useParams, useLocation } from "react-router-dom";
import { UserActions } from "../../constants/userActions";
import FormUser from "../../components/users/FormUser";

export default function UserDetails() {
  const location = useLocation();
  const action = location.state?.action as UserActions;
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <FormUser userId={id} userAction={action} />
    </>
  );
}

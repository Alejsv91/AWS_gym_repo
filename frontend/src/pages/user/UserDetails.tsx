import { useParams } from "react-router-dom";
import { useFetchUserById } from "../../services/userService";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const userInfo = useFetchUserById(id!);

  console.log(userInfo);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit User {id}</h2>
      {/* Aquí tu formulario */}
    </div>
  );
}
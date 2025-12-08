import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit User {id}</h2>
      {/* Aquí tu formulario */}
    </div>
  );
}
import { useUsers } from "../../services/userService";

const UsersTable = () => {
  const users = useUsers();
  return (
    <>
      <div>Users Table Component</div>
      <tbody>
        {users.map((user)=>(
            <tr key={user.id}>
                <td className="fw-bold">{user.firstName}</td>
                <td>{user.email}</td>
                <td>
                <button className="btn btn-sm btn-outline-success me-2">
                    Editar
                </button>
                <button className="btn btn-sm btn-outline-danger">
                    Eliminar
                </button>
                </td>
            </tr>
        ))}
      </tbody>
    </>
  );
};

export default UsersTable;

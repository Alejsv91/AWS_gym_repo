import { useUsers } from "../../services/userService";

const UsersTable = () => {
  const users = useUsers();
  return (
    <>
      <div className="container mt-5">
      <h2 className="mb-4 text-center">Users</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Role</th>
              <th scope="col">Identification Type</th>
              <th scope="col">Identification Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="fw-bold">{user.email}</td>
                <td className="fw-bold">{user.firstName}</td>
                <td className="fw-bold">{user.lastName}</td>
                <td className="fw-bold">{user.role.name}</td>
                <td className="fw-bold">{user.identificationType.name}</td>
                <td className="fw-bold">{user.identificationNumber}</td>
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
        </table>
      </div>
    </div>
    </>
  );
};

export default UsersTable;

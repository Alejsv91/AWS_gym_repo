import { useUsers } from "../../services/userService";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const UsersTable = () => {
  const users = useUsers();
  const userDetailsRoute = PATHS.USER_DETAILS;
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
              <th scope="col">Nationality</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="fw-bold">{user.email}</td>
                <td className="fw-bold">{user.firstName}</td>
                <td className="fw-bold">{user.lastName}</td>
                <td className="fw-bold">{user.role.name}</td>
                <td className="fw-bold">{user.identificationType.name}</td>
                <td className="fw-bold">{user.identificationNumber}</td>
                <td className="fw-bold">{user.nationality}</td>
                <td className="fw-bold">{user.phoneNumber}</td>
                <td>
                  <Link to={`${userDetailsRoute}${user.id}`} className="btn btn-sm btn-outline-success me-2">
                    Edit
                  </Link>
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

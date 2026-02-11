import { useRoles } from "../../services/roleService";
import LoadingModal from "../Loading";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const RolesTable: React.FC = () => {
  const { roles, isLoading } = useRoles();

  return isLoading ? (
    <LoadingModal isLoading />
  ) : (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Roles List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id}>
                <td className="fw-bold">{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <Link
                    to={`${PATHS.ROLES_DETAILS}${role.id}`}
                    className="btn btn-sm btn-outline-success me-2"
                  >
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
  );
};

export default RolesTable;

import { useEffect, useState } from "react";
import { useRoles } from "../../services/roleService";

const RolesTable: React.FC = () => {
  const roles = useRoles();

  return (
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
  );
};

export default RolesTable;

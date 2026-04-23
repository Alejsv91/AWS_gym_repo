import { useGetPermissionsByRoleId } from "../../services/permissionService";

export interface PermissionsProps {
  roleId: string;
}

export default function PermissionsTable() {
  const { permissions, isLoading, loadingMessage } =
    useGetPermissionsByRoleId("1"); // Replace "1" with actual roleId from props

  return (
    <>
      <h2 className="">Assigned permissions</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through permissions and display them here */}
            {/* Example: */}
            {/* {permissions.map(permission => (
                    <tr key={permission.id}>
                        <td>{permission.name}</td>
                        <td>{permission.description}</td>
                    </tr>
                    ))} */}
          </tbody>
        </table>
      </div>
    </>
    // <div className="container mt-4">
    // <h2 >Assigned permissions</h2>
    // <div className="table-responsive"><div/>
    // </div>
  );
}

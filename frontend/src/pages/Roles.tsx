import { useRoles } from "../services/roleService";

const Roles: React.FC = () => {
  const { roles, fetchRoles } = useRoles();

  return (
    <div>
      <h1>Roles</h1>
      <button onClick={fetchRoles}>Cargar Roles</button>
      <ul>
        {roles.map((r) => (
          <li key={r.id}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;
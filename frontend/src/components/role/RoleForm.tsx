import {useParams } from 'react-router-dom';

// interface FormRoleProps {
//     id: string;
// }

export default function RoleForm() {
    const {id } = useParams<{ id: string }>();
  return <div>RoleForm {id}</div>;
}
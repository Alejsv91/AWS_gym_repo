import {useParams } from 'react-router-dom';
import { useGetRoleById } from "../../services/roleService";  
import { useState, useEffect } from "react";

export default function RoleForm() {
    const {id } = useParams<{ id: string }>();
    const { role, isRoleLoading } = useGetRoleById(id || '');
    const [showModal, setShowModal] = useState(false);

    useEffect(() =>{
      if (!isRoleLoading && role) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    })

  return <div>RoleForm {id} and role name is {role?.name}</div>;
}
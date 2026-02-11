import Roles from "../pages/Roles";
import RoleForm from "../components/role/RoleForm";
import Users from "../pages/Users";
import UserDetails from "../pages/user/UserDetails";
import { RouteName } from "./routeNames";
import { PATHS } from "./paths";

export const ROUTES = [
    {name: RouteName.ROLES, path: PATHS.ROLES, element: <Roles/>, label: "Roles", showInNav: true},
    {name: RouteName.ROLE_DETAILS, path: `${PATHS.ROLES_DETAILS}:id`, element: <RoleForm />, label: "Role Details", showInNav: false},
    {name: RouteName.USERS, path: PATHS.USERS, element: <Users />, label: "Users", showInNav: true}, 
    {name: RouteName.USER_DETAILS, path: `${PATHS.USER_DETAILS}:id`, element: <UserDetails />, label: "User Details", showInNav: false},
    {name: RouteName.USER_CREATE, path: `${PATHS.USER_DETAILS}`, element: <UserDetails />, label: "Create User", showInNav: false}
];

import Roles from "../pages/Roles";
import Users from "../pages/Users";
export const ROUTES = [
    {path: "/users", element: <Users />, label: "Users", showInNav: true}, 
    {path: "/roles", element: <Roles/>, label: "Roles", showInNav: true}
]
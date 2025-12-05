import UsersTable from "../components/users/UsersTable";

const Users: React.FC = () => {
  // const runTest = async () => {
  //   try {
  //     const { data } = await api.get("/users");
  //     setUsers(data);
  //     console.log("Users:", data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // return (
  //   <div>
  //     <h1>API Test with Cognito</h1>
  //     <button onClick={runTest}>run test</button>
  //     <ul>
  //       {/* {users.map((user) => (
  //         <li key={user.id}>{user.name}</li>
  //       ))} */
  //       }
  //     </ul>
  //   </div>
  // );
  return (
    <>
      <UsersTable />
    </>
  );
};
export default Users;

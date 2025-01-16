import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function UserList() {
  const [users, setUsers] = useState<User[] | null>(null);

  interface User {
    id: number;
    uname: string;
  }

  const getUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>User List</h1>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id}, <strong>Name:</strong> {user.uname}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading users...</p> // Show a loading message while users are being fetched
      )}
    </>
  );
}

export default UserList;

import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";

function ManageUsersPage() {

    const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await getAllUsers();
    setUsers(res);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>

        <h1>Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ol>
          {users.map((oneUser) => (
            <li key={oneUser._id}>
              <h2>{oneUser.username}</h2>
              <p>Email: {oneUser.email}</p>
              <p>Role: {oneUser.role}</p>
            </li>
          ))}
        </ol>
      )}

    </div>
  )
}

export default ManageUsersPage
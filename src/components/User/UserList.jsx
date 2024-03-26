import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  console.log(users);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>User List</h2>
      </div>
      {Array.isArray(users) &&
        users.map((user) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};

export default UserList;

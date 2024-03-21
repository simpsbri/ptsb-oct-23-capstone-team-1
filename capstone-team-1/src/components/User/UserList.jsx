import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import UserCard from "./UserCard";
import HorizontalNav from "../Navigation/HorizontalNav";

const UserList = ({ handleEditClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mx-auto h-auto">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="flex justify-center items-center w-full py-2">
          <div className="flex-1 text-center"></div>
          <button
            // onClick={handleCreateNewUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ position: "absolute", right: "20px" }}
          >
            Create New User
          </button>
        </div>
        <div className="flex flex-col w-full px-4">
          {users &&
            users.map((user) => (
              <UserCard
                user={user}
                key={user.id}
                handleEditClick={handleEditClick}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default UserList;

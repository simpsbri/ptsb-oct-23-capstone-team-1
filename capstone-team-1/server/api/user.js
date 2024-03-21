// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserCard from "./UserCard";
// import router from "./user";

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/api/users");
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         // Handle error, perhaps set an error state
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2>User List</h2>
//       {Array.isArray(users) &&
//         users.map((user) => <UserCard key={user._id} user={user} />)}
//     </div>
//   );
// };

// export default router;

import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user by ID
router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

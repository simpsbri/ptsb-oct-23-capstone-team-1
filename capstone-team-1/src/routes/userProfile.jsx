import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/User/UserProfile";
import userList from "../data/userList.json"; // Assuming this is the correct path to your local JSON data

const Profile = () => {
  const { id } = useParams(); // useParams will return the userId as a string
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate an API call by finding the user in the local JSON data
    // Ensure the id from the URL is of the same type as the user.id in your data
    const fetchedUser = userList.find((user) => user.id.toString() === id);
    setUser(fetchedUser);
  }, [id]);

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return <UserProfile user={user} />;
};

export default Profile;

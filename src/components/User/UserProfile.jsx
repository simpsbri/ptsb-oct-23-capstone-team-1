import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableUser(user);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setUser(response.data);
        setEditableUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSave = async () => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const { _id, ...editedUser } = editableUser;
      console.log("editedUser", editedUser);
      const response = await axios.put(
        `http://localhost:4000/users/${id}`,
        editedUser
      );
      if (response.status === 200) {
        setUser(editableUser);
        setSaveSuccess(true);
        console.log("User profile updated successfully");
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("An error occurred while updating the profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditableUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleLanguageChange = (index, newLanguage) => {
    const updatedLanguages = [...editableUser.languages];
    updatedLanguages[index] = newLanguage;
    setEditableUser((prevState) => ({
      ...prevState,
      languages: updatedLanguages,
    }));
  };

  const inputStyle = "bg-black border p-2 rounded border-gray-400 w-full mb-4";

  return (
    <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
      <div className="flex flex-col justify-between ml-4">
        <h1 className="text-2xl text-primary_dark_cyan font-bold mb-4">
          User Profile
        </h1>

        <div className="mb-4">
          {/* Filter to only include name, email, role, bio */}
          {Object.entries(editableUser || {})
            .filter(([key]) => ["name", "email", "role", "bio"].includes(key))
            .map(([key, value]) =>
              isEditing ? (
                <input
                  key={key}
                  type={key === "email" ? "email" : "text"}
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className={inputStyle}
                />
              ) : (
                <p
                  key={key}
                  className="text-dark_gray_cyan text-base mb-4"
                >{`${key}: ${value}`}</p>
              )
            )}

          {/* Languages Display and Edit */}
          {editableUser?.languages && (
            <div className="flex flex-wrap gap-2 mb-4">
              {isEditing
                ? editableUser.languages.map((language, index) => (
                    <input
                      key={`language-${index}`}
                      type="text"
                      value={language}
                      onChange={(e) =>
                        handleLanguageChange(index, e.target.value)
                      }
                      className={inputStyle}
                    />
                  ))
                : editableUser.languages.map((language, index) => (
                    <span
                      key={`language-view-${index}`}
                      className="bg-light_grayish_cyan_filter_pill font-bold p-2 rounded"
                    >
                      {language}
                    </span>
                  ))}
            </div>
          )}
        </div>

        <button
          onClick={isEditing ? handleSave : toggleEdit}
          className="bg-primary_dark_cyan text-white font-bold p-2 rounded self-start"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>

        {saveSuccess && (
          <div className="text-green-500 mt-3">
            Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

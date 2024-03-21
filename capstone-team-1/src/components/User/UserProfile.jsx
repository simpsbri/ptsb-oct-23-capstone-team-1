import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });

  // This function is updated to make an API call
  const handleSave = async () => {
    try {
      // Make an API call to update the user data
      // Replace '/api/users/:id' with the actual ID of the user
      const response = await axios.put(
        `/api/users/${editableUser._id}`,
        editableUser
      );
      // Assuming the API returns the updated user object, update the state
      setEditableUser(response.data);
      toggleEdit();
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error, e.g., show an error message to the user
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
  const textareaStyle =
    "bg-black border p-2 rounded border-gray-400 w-full mb-4";

  return (
    <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
      <div className="flex flex-col justify-between ml-4">
        {/* Profile Picture */}
        <img
          src={editableUser.profilePicture}
          alt={`${editableUser.name}'s profile`}
          className="w-32 h-32 rounded-full mb-4"
        />

        {/* Profile Header */}
        <h1 className="text-2xl text-primary_dark_cyan font-bold mb-4">
          User Profile
        </h1>

        {/* User Info */}
        <div className="mb-4">
          {/* Name with Link or Input */}
          {isEditing ? (
            <input
              type="text"
              value={editableUser.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={inputStyle}
            />
          ) : (
            <h2 className="py-2 text-primary_dark_cyan text-lg">
              <Link
                to={`/users/${editableUser.userId}`}
                className="hover:underline"
              >
                {editableUser.name}
              </Link>
            </h2>
          )}

          {/* Email or Input */}
          {isEditing ? (
            <input
              type="email"
              value={editableUser.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={inputStyle}
            />
          ) : (
            <p className="text-dark_gray_cyan text-base mb-4">
              {editableUser.email}
            </p>
          )}

          {/* Role or Input */}
          {isEditing ? (
            <input
              type="text"
              value={editableUser.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className={inputStyle}
            />
          ) : (
            <p className="text-dark_gray_cyan text-base mb-4">
              {editableUser.role}
            </p>
          )}

          {/* Admin Badge */}
          {editableUser.isAdmin && (
            <span className="bg-primary_dark_cyan rounded-full px-3 text-base text-white">
              Admin
            </span>
          )}
        </div>

        {/* Bio or Textarea */}
        {isEditing ? (
          <textarea
            value={editableUser.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            className={textareaStyle}
          />
        ) : (
          <p className="text-dark_gray_cyan text-base mb-4">
            {editableUser.bio}
          </p>
        )}

        {/* Languages */}
        {isEditing ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {editableUser.languages.map((language, index) => (
              <input
                key={`language-${index}`}
                type="text"
                value={language}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
                className={inputStyle}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {editableUser.languages.map((language, index) => (
              <span
                key={`language-${index}`}
                className="bg-light_grayish_cyan_filter_pill font-bold p-2 rounded"
              >
                {language}
              </span>
            ))}
          </div>
        )}

        {/* Edit Profile Button */}
        <button
          onClick={isEditing ? handleSave : toggleEdit}
          className="bg-primary_dark_cyan text-white font-bold p-2 rounded self-start"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

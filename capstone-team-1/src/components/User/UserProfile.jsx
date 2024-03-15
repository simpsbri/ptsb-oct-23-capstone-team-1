import React from "react";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  const { userId, name, email, isAdmin, role, languages, profilePicture, bio } =
    user; // Assume `userId`, `profilePicture`, and `bio` are passed in

  return (
    <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
      <div className="flex flex-col justify-between ml-4">
        {/* Profile Picture */}
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          className="w-32 h-32 rounded-full mb-4"
        />

        {/* Profile Header */}
        <h1 className="text-2xl text-primary_dark_cyan font-bold mb-4">
          User Profile
        </h1>

        {/* User Info */}
        <div className="mb-4">
          {/* Name with Link */}
          <h2 className="py-2 text-primary_dark_cyan text-lg">
            <Link to={`/users/${userId}`} className="hover:underline">
              {name}
            </Link>{" "}
            {/* Make sure this path is correct based on your router setup */}
          </h2>
          <p className="text-dark_gray_cyan text-base">{email}</p>
          <p className="text-dark_gray_cyan text-base">{role}</p>
          {isAdmin && (
            <span className="bg-primary_dark_cyan rounded-full px-3 text-base text-white">
              Admin
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-dark_gray_cyan text-base mb-4">{bio}</p>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map((language, index) => (
            <span
              key={`language-${index}`}
              className="bg-light_grayish_cyan_filter_pill font-bold p-2 rounded"
            >
              {language}
            </span>
          ))}
        </div>

        {/* Edit Profile Button */}
        <button className="bg-primary_dark_cyan text-white font-bold p-2 rounded self-start">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

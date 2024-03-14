import React from 'react';

const UserProfile = ({ user }) => {
  const { name, email, isAdmin, role, languages } = user;

  return (
    <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
      <div className="flex flex-col justify-between ml-4">
        {/* Profile Header */}
        <h1 className="text-2xl text-primary_dark_cyan font-bold mb-4">User Profile</h1>
        {/* User Info */}
        <div className="mb-4">
          <h2 className="py-2 text-primary_dark_cyan text-lg">{name}</h2>
          <p className="text-dark_gray_cyan text-base">{email}</p>
          <p className="text-dark_gray_cyan text-base">{role}</p>
          {isAdmin && (
            <span className="bg-primary_dark_cyan rounded-full px-3 text-base text-white">
              Admin
            </span>
          )}
        </div>
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
        <button
          className="bg-primary_dark_cyan text-white font-bold p-2 rounded self-start"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
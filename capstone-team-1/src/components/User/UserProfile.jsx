// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";

// const UserProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editableUser, setEditableUser] = useState(null);
//   const { id } = useParams();
//   const [user, setUser] = useState({});
//   const [name, setName] = useState({});
//   console.log(name);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [status, setStatus] = useState("");
//   const [role, setRole] = useState("");
//   const [isAdmin, setIsAdmin] = useState("");
//   const [bio, setBio] = useState("");
//   const [languages, setLanguages] = useState(["English"]);
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/users/${id}`);
//         setUser(response.data);
//         setLanguages(response.data.languages || []);
//         setName(response.data.name || "");
//         setEmail(response.data.email || "");
//         setPassword(response.data.password || "");
//         setStatus(response.data.status || "");
//         setRole(response.data.role || "");
//         setIsAdmin(response.data.isAdmin || false);
//         setBio(response.data.bio || "");
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.error("User not found");
//           // Display a message to the user or navigate to a different page
//         } else {
//           console.error("Error fetching user:", error);
//         }
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleSave = async () => {
//     if (!id) {
//       console.error("User ID is undefined");
//       return;
//     }

//     try {
//       const userData = {
//         name: name,
//         email: email,
//         password: password,
//         status: status,
//         role: role,
//         isAdmin: isAdmin,
//         bio: bio,
//       };
//       const response = await axios.put(
//         `http://localhost:4000/users/${id}`,
//         userData,
//         toggleEdit() // Replaced setIsEditing(false) with toggleEdit() to match requested behavior
//       );

//       if (response.status === 200) {
//         setSaveSuccess(true);
//         console.log("User profile updated successfully");
//       } else {
//         console.error("Failed to update profile");
//       }
//     } catch (error) {
//       console.error("An error occurred while updating the  profile:", error);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setUser((prevState) => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };
//   const handleLanguageChange = (index, newLanguage) => {
//     const updatedLanguages = [...editableUser.languages];
//     updatedLanguages[index] = newLanguage;
//     setEditableUser((prevState) => ({
//       ...prevState,
//       languages: updatedLanguages,
//     }));
//   };

//   const inputStyle = "bg-black border p-2 rounded border-gray-400 w-full mb-4";
//   const textareaStyle =
//     "bg-black border p-2 rounded border-gray-400 w-full mb-4";
//   console.log(typeof name);
//   return (
//     <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
//       <div className="flex flex-col justify-between ml-4">
//         {/* Profile Header */}
//         <h1 className="text-2xl text-primary_dark_cyan font-bold mb-4">
//           User Profile
//         </h1>

//         {/* User Info */}
//         <div className="mb-4">
//           {/* Name with Link or Input */}
//           {isEditing ? (
//             <input
//               type="text"
//               value={name.toString()}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               className={inputStyle}
//             />
//           ) : (
//             <h2 className="py-2 text-primary_dark_cyan text-lg">
//               <p className="text-dark_gray_cyan text-base mb-4">
//                 {name.toString()}
//               </p>
//             </h2>
//           )}

//           {/* Email or Input */}
//           {isEditing ? (
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               className={inputStyle}
//             />
//           ) : (
//             <p className="text-dark_gray_cyan text-base mb-4">{email}</p>
//           )}

//           {/* Role or Input */}
//           {isEditing ? (
//             <input
//               type="text"
//               value={role}
//               onChange={(e) => handleInputChange("role", e.target.value)}
//               className={inputStyle}
//             />
//           ) : (
//             <p className="text-dark_gray_cyan text-base mb-4">{role}</p>
//           )}

//           {/* Admin Badge */}
//           {isAdmin && (
//             <span className="bg-primary_dark_cyan rounded-full px-3 text-base text-white">
//               Admin
//             </span>
//           )}
//         </div>

//         {/* Bio or Textarea */}
//         {isEditing ? (
//           <textarea
//             value={bio}
//             onChange={(e) => handleInputChange("bio", e.target.value)}
//             className={textareaStyle}
//           />
//         ) : (
//           <p className="text-dark_gray_cyan text-base mb-4">{bio}</p>
//         )}

//         {/* Languages */}
//         {/* {isEditing ? (
//           <div className='flex flex-wrap gap-2 mb-4'>
//             {languages.map((language, index) => (
//               <input
//                 key={`language-${index}`}
//                 type='text'
//                 value={language}
//                 onChange={(e) => handleLanguageChange(index, e.target.value)}
//                 className={inputStyle}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className='flex flex-wrap gap-2 mb-4'>
//             {languages.map((language, index) => (
//               <span
//                 key={`language-${index}`}
//                 className='bg-light_grayish_cyan_filter_pill font-bold p-2 rounded'
//               >
//                 {language}
//               </span>
//             ))}
//           </div>
//         )} */}

//         {/* Edit Profile Button */}
//         <button
//           onClick={isEditing ? handleSave : toggleEdit}
//           className="bg-primary_dark_cyan text-white font-bold p-2 rounded self-start"
//         >
//           {isEditing ? "Save Changes" : "Edit Profile"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

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
      const response = await axios.put(
        `http://localhost:4000/users/${id}`,
        editableUser
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

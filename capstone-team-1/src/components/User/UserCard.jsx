import { Link } from "react-router-dom";

const UserCard = ({ user, handleEditClick }) => {
  const { _id, name, email, isAdmin, role, postedAt, status, languages } = user;

  return (
    <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row">
      <div className="flex-flex-col-justify-between ml-4">
        {/* user info */}
        <h1 className="py-2 text-primary_dark_cyan text-lg">
          {/* Wrap the user name in a Link component */}
          <Link to={`/users/${_id}`} className="hover:text-teal-700">
            {name}
          </Link>

          {isAdmin && (
            <span className="bg-primary_dark_cyan rounded-full px-3 text-base text-white ml-4">
              Admin
            </span>
          )}
        </h1>
        <p className="text-dark_gray_cyan text-base">{email}</p>
        {/* job info */}
        <p className="flex items-center gap-2 text-dark_gray_cyan text-base pr-6">
          {role} - {status} - {postedAt}
        </p>
        {/* languages */}
        <div className="flex items-center gap-2">
          {languages.map((language, index) => (
            <span
              key={`language-${index}`}
              className="bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
      {/* Edit user button */}
      <div className="flex items-center mt-4 mx-4 pt-4 sm:ml-auto">
        {/* <button
          className="bg-primary_dark_cyan text-white font-bold p-2 rounded"
          onClick={() => handleEditClick(user)}
        >
          Edit User
        </button> */}
      </div>
    </div>
  );
};

export default UserCard;

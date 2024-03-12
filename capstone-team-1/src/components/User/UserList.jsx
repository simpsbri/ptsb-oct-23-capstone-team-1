import UserCard from "./UserCard";

const UserList = ({ handleEditClick, filteredUsers, handleCreateNewUser }) => {
  return (
    <div className="flex flex-col items-center mx-auto h-auto">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="flex justify-center items-center w-full py-2">
        <div className="flex-1 text-center"></div>
        <button
          onClick={handleCreateNewUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          style={{ position: "absolute", right: "20px" }}
        >
          Create New User
        </button>
      </div>
      <div className="flex flex-col w-full px-4">
        {filteredUsers &&
          filteredUsers.map((user) => (
            <UserCard
              user={user}
              handleEditClick={handleEditClick}
              key={user.id}
            />
          ))}
      </div>
    </div>
  );
};

export default UserList;

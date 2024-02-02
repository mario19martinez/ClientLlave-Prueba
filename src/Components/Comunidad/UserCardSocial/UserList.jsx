// eslint-disable-next-line no-unused-vars
import React from "react";
import UserCard from "./UserCard"; 
import PropTypes from "prop-types";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          username={user.username}
          email={user.email}
        />
      ))}
    </div>
  );
};

UserList.propTypes = {
    users: PropTypes.array.isRequired,
  };

export default UserList;

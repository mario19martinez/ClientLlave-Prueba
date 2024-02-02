// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ name, username, email }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">@{username}</p>
      <p className="text-gray-600">{email}</p>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserCard;


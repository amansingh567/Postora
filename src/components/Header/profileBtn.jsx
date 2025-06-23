import React from 'react';
import { Link } from 'react-router-dom';

function ProfileBtn() {
  return (
    <Link
      to="/profile"
      className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
    >
      Profile
    </Link>
  );
}

export default ProfileBtn;
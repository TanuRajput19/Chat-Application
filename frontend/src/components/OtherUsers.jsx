import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector(store => store.user);

  if (!otherUsers || otherUsers.length === 0) {
    return <div className="text-center text-gray-500 mt-4">No users found.</div>;
  }

  return (
    <div className='overflow-auto flex-1'>
      {
        otherUsers.map((user) => (
          <OtherUser key={user._id} user={user} />
        ))
      }
    </div>
  );
};

export default OtherUsers;

// components/UserProfile.tsx
import React from "react";
import "../styles/UserProfile.css";
// interface UserProfileProps {
//   name: string;
//   designation: string;
//   avatarSrc: string;
// }
// Updated UserProfile component

const UserProfile = ({ name, designation, avatarSrc }) => {
  return (
    <>
      <div className="user-profile">
        <div className="avatar">
          <img src={avatarSrc} alt={avatarSrc} />
        </div>
        <div className="info">
          <div className="name">{name}</div>
          <div className="designation">{designation}</div>
        </div>
      </div>
      <div className="buttons">
        <button className="edit-button">Edit Profile</button>
        <button className="add-link-button">Add Links</button>
      </div>
      <div className="divider"></div>
      <div className="buttons">
        <button className="add-new-link-button">Add a new link here</button>
      </div>
    </>
  );
};

export default UserProfile;

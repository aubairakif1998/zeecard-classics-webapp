import UserProfile from "../components/UserProfile";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import * as apiService from "../utils/api-service";
import { useNavigate } from "react-router-dom";
import UserModel from "../models/user_model";
import LoadingSpinner from "../components/LoadingSpinner";
import BottomNavbar from "../components/BottomNavbar";
import SwipeableButton from "../components/SwipeableButton";

import { useParams } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { user, loading, getRefreshToken } = useAuth();
  const [dataState, setDataState] = useState("loading");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();
  const handleSwipeLeft = () => alert("Swiped Left!");
  const handleSwipeRight = () => alert("Swiped Right!");

  // const { uid } = useParams();
  // const [user, setUser] = useState(null);
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!loading && id && user) {
        try {
          const idToken = await getRefreshToken();
          const { found, data } = await apiService.getUserData({
            idToken,
            uid: id,
          });

          if (found) {
            setUserInfo(UserModel.fromMap(data.user));
            setDataState("success");
          } else {
            console.log("User not found. Redirecting...");
            navigate(`/${id}/complete-profile`);
          }
        } catch (error) {
          console.log("err", error);
          if (error?.error.code === "unauthenticated") {
            navigate("/signin");
          }
          if (error?.error.code === "unauthorized") {
            navigate("/UnauthorizedPage");
          }
          setDataState(error?.error.code);
        }
      } else {
        navigate("/signin");
      }
    };

    fetchData();
  }, [loading, getRefreshToken, id, user, navigate]);
  const handleEditProfile = () => {
    // Handle edit profile action
  };

  const handleAddLinks = () => {
    // Handle add links action
  };
  const handleShareProfile = () => {
    // Handle edit profile action
  };

  return (
    <>
      {dataState === "loading" && (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      )}{" "}
      {dataState === "success" && (
        <>
          <div className="profile-screen-container">
            <div className="app-bar">
              <h1 style={{ margin: 0, textAlign: "center", flexGrow: 1 }}>
                {userInfo ? userInfo.username : "Unnamed"}
              </h1>
              {
                // isMe && !isWeb &&

                <div
                  onClick={() => handleShareProfile()}
                  className="qr-code-icon"
                >
                  <div>
                    <img src="/QrCode.jpg" alt="QrCode" />
                  </div>
                </div>
              }
            </div>

            {/* Body */}
            <div className="profile-body">
              {/* User Info */}
              <div className="user-info">
                <UserProfile
                  name={userInfo.username}
                  designation={userInfo.email}
                  avatarSrc={userInfo.profilePicture}
                />
              </div>

              {/* Action Buttons */}
              {/* <div className="action-buttons">
         <button onClick={handleEditProfile}>Edit Profile</button>
         <button onClick={handleAddLinks}>Add Links</button>
       </div> */}

              {/* Links Section */}
              <div className="links-section">
                {/* Render links using map function */}
                {userInfo &&
                  userInfo.linkSequence.map((linkId) => (
                    <div key={linkId} className="link-item">
                      {/* Render link details */}
                    </div>
                  ))}
              </div>
              {/* <SwipeableButton
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              /> */}
              {/* Add Link Button */}
              <div className="add-link-button">
                <button
                  onClick={() => {
                    navigate("./add-links");
                  }}
                >
                  Add a news link here
                </button>
              </div>
            </div>
            <BottomNavbar />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

// // React Component
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { ReactComponent as EditImage } from './assets/editImage.svg';
// import { ReactComponent as StatsIcon } from './assets/stats.svg';
// import { ReactComponent as AddIcon } from './assets/add.svg';
// import { ReactComponent as QrCodeIcon } from './assets/qrCode.svg';
// import { ReactComponent as CheckCircleIcon } from '@material-ui/icons/CheckCircle';

// import './ProfileScreenView.css'; // Import your CSS file

// const ProfileScreenView = () => {

//   useEffect(() => {
//     // Fetch user data based on the uid using React's state and useEffect
//     // Replace this with your actual data fetching logic
//     // setUser(result);
//     // setIsMe(result.uid === currentUserId);
//   }, [uid]);

//   const handleEditProfile = () => {
//     // Handle edit profile action
//   };

//   const handleAddLinks = () => {
//     // Handle add links action
//   };

//   return (

//   );
// };

// export default ProfileScreenView;

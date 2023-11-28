// src/components/Home.tsx
import React from "react";
import { useAuth } from "../auth";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const { user, loading, signOut, getRefreshToken, getUserIdToken } = useAuth();
  // const token = useSelector((state) => state.currentUser.token);
  // console.log("Fetched: ", token);
  return (
    <div className="scrollable-container">
      <div className="profile-container">
        <div className="heading-text">PROFILE</div>
        <div className="title-container">
          <img className="title-container-image" src="/Edit.png" alt="" />
          <p className="title-container-font">Edit your Profile</p>
        </div>
        <div className="title-container">
          <img className="title-container-image" src="/Change.png" alt="" />
          <p className="title-container-font">Change Password</p>
        </div>
        <div className="title-container">
          <img
            className="title-container-image"
            src="/Shareyourprofile.png"
            alt=""
          />
          <p className="title-container-font">Share your Profile</p>
        </div>
        <div className="Zeecard-heading-text">Zeecard</div>
        <div className="title-container">
          <img className="title-container-image" src="/buyzeecard.png" alt="" />
          <p className="title-container-font">Buy a Zeecard</p>
        </div>
        <div className="title-container">
          <img
            className="title-container-image"
            src="/activatezeecard.png"
            alt=""
          />
          <p className="title-container-font">Activate new Zeecard</p>
        </div>
        <div className="title-container">
          <img
            className="title-container-image"
            src="/readzeecard.png"
            alt=""
          />
          <p className="title-container-font">Read a Zeecard</p>
        </div>
      </div>
      <div className="profile-container extra-padding">
        <div className="heading-text">SUPPORT</div>
        <div className="title-container">
          <img className="title-container-image" src="/tutorial.png" alt="" />
          <p className="title-container-font">Tutorial</p>
        </div>
        <div className="title-container">
          <img className="title-container-image" src="/report.png" alt="" />
          <p className="title-container-font">Report a Problem</p>
        </div>
        <div
          className="title-container"
          onClick={() => {
            signOut();
          }}
        >
          <img className="title-container-image" src="/signout.png" alt="" />
          <p className="title-container-font">Sign Out</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

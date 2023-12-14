// src/components/Home.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import "../styles/Home.css";
import * as apiService from "../utils/api-service";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component
import BottomNavbar from "../components/BottomNavbar"; // Import the LoadingSpinner component

import { useParams } from "react-router-dom";
const Home = () => {
  const [dataState, setDataState] = useState("loading");
  const { user, loading, signOut, getRefreshToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (!loading && id && user) {
        console.log("HOME = Fetching user id from url", id);
        try {
          const idToken = await getRefreshToken();
          const { found, data } = await apiService.getUserData({
            idToken,
            uid: id,
          });
          if (found) {
            setDataState("success");
          } else {
            console.log("User not found. Redirecting...");
            navigate(`/${id}/complete-profile`);
          }
        } catch (error) {
          console.log("err", error);
          if (error && error.error && error.error.code === "unauthenticated") {
            navigate("/signin");
          } else if (
            error &&
            error.error &&
            error.error.code === "unauthorized"
          ) {
            navigate("/UnauthorizedPage");
          } else {
            // Handle other error cases or log the error
            console.error("Unexpected error:", error);
            setDataState("error"); // Set a state to indicate an error
          }
        }
      } else {
        navigate("/signin");
      }
    };

    fetchData();
  }, [loading, user, id, signOut, navigate, getRefreshToken]);

  return (
    <>
      {dataState === "loading" && (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      )}{" "}
      {dataState === "success" && (
        <>
          <div className="scrollable-container">
            <div className="profile-container">
              <div className="heading-text">PROFILE</div>
              <div className="title-container">
                <img className="title-container-image" src="/Edit.png" alt="" />
                <p className="title-container-font">Edit your Profile</p>
              </div>
              <div className="title-container">
                <img
                  className="title-container-image"
                  src="/Change.png"
                  alt=""
                />
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
                <img
                  className="title-container-image"
                  src="/buyzeecard.png"
                  alt=""
                />
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
                <img
                  className="title-container-image"
                  src="/tutorial.png"
                  alt=""
                />
                <p className="title-container-font">Tutorial</p>
              </div>
              <div className="title-container">
                <img
                  className="title-container-image"
                  src="/report.png"
                  alt=""
                />
                <p className="title-container-font">Report a Problem</p>
              </div>
              <div
                className="title-container"
                onClick={() => {
                  signOut();
                }}
              >
                <img
                  className="title-container-image"
                  src="/signout.png"
                  alt=""
                />
                <p className="title-container-font">Sign Out</p>
              </div>
            </div>
          </div>
          <BottomNavbar />
        </>
      )}
      {dataState === "nouser" && <>No user. redirecting to sign in</>}
    </>
  );
};

export default Home;

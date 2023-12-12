import UserProfile from "../components/UserProfile";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import * as apiService from "../utils/api-service";
import { useNavigate } from "react-router-dom";
import UserModel from "../models/user_model";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component
import BottomNavbar from "../components/BottomNavbar"; // Import the LoadingSpinner component
import { useParams } from "react-router-dom";
const Profile = () => {
  const { user, loading, getRefreshToken } = useAuth();
  const [dataState, setDataState] = useState("loading");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();
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

  return (
    <>
      {dataState === "loading" && (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      )}{" "}
      {/* Show loading spinner */}
      {dataState === "success" && (
        <>
          <UserProfile
            name={userInfo.username}
            designation={userInfo.email} // It seems like you are using the same value for name and designation, you might want to adjust this.
            avatarSrc={userInfo.profilePicture}
          />
          <BottomNavbar />
        </>
      )}
    </>
  );
};

export default Profile;

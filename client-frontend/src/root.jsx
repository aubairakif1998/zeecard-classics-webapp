// src/components/Home.tsx
import React, { useEffect, useState } from "react";
import "../src/styles/Home.css";
import { useAuth } from "./auth";
import * as apiService from "../src/utils/api-service";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../src/components/LoadingSpinner"; // Import the LoadingSpinner component

const Root = () => {
  const { user, loading, getRefreshToken } = useAuth();
  const [dataState, setDataState] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && user) {
        console.log("Authenticated User from Firebase", user);
        console.log("Fetching user details from the server ", user);
        try {
          const idToken = await getRefreshToken();
          console.log("Frontend Token view", idToken);
          const { found, data } = await apiService.getUserData({
            idToken,
            uid: user.uid,
          });
          if (found) {
            console.log("FETCHED USER:", data);
            setDataState("success");
            navigate(`${user.uid}/home`);
          } else {
            console.log("User not found. Redirecting...");
            navigate(`/${user.uid}/complete-profile`);
          }
        } catch (error) {
          console.log("err", error);
          if (error?.error.code === "unauthenticated") {
            navigate("/UnauthorizedPage");
          }
          setDataState(error?.error.code);
        }
      } else {
        navigate("/signin");
      }
    };

    fetchData();
  }, [user, loading, getRefreshToken, navigate]);

  return (
    <>
      {dataState === "loading" && (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      )}{" "}
      {dataState !== "loading" && <>Redirecting...</>}
    </>
  );
};

export default Root;

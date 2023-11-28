import React, { useEffect } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import BottomNavBar from "./components/BottomNavbar";
import { useAuth } from "./auth";
import { useDispatch } from "react-redux";
import { setUserIdToken } from "./features/currentUser/currentUserSlice";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user, loading, getRefreshToken, getUserIdToken } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      if (!loading && user) {
        try {
          const idToken = await getRefreshToken();
          console.log("Frontend Token view", idToken);
          console.log("FETCHED USER: ", idToken);
          if (idToken) {
            dispatch(setUserIdToken({ idToken }));
          }
          // const res = await apiService.getUserData({
          //   idToken: idToken,
          //   user: user,
          // });
        } catch (error) {
          console.log("err", error);
        }
      }
    };

    fetchToken();
  }, [user, loading, dispatch, getUserIdToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      element={
        user ? (
          <Element />
        ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )
      }
    />
  );
};

export default ProtectedRoute;

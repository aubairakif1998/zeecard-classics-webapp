import "./App.css";
// import { useAuth } from "./auth";
// import { Button, Typography, Box } from "@mui/material";
// import { Link } from "react-router-dom";
// import * as apiService from "./utils/api-service";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser, clearUser } from "./features/currentUser/currentUserSlice";
// import BottomNavBar from "./components/BottomNavbar";
// import { useLocation, Navigate } from "react-router-dom";
// import ReactDOM from "react-dom/client";
// import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./routes/LogIn";
import Home from "./routes/Home";
import Root from "./root";
import Register from "./routes/Register";
// import BottomNavbar from "./components/BottomNavbar";
import Profile from "./routes/Profile";
import { RequireAuth, NoRequireAuth } from "./auth";
import Settings from "./routes/Settings";
import CompleteProfile from "./routes/Complete-Profile";
import UnauthorizedPage from "./routes/UnauthorizedPage";

function App() {
  const child = (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Root />
              </RequireAuth>
            }
          />
          <Route
            path="/:id/home"
            element={
              <>
                {" "}
                <Home />
              </>
            }
          />
          <Route
            path="/:id/profile"
            element={
              <>
                <Profile />
              </>
            }
          />
          <Route
            path="/:id/settings"
            element={
              <>
                <Settings />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <NoRequireAuth>
                <LogIn />
              </NoRequireAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <NoRequireAuth>
                <Register />
              </NoRequireAuth>
            }
          />
          <Route
            path="/:id/complete-profile"
            element={
              <RequireAuth>
                <CompleteProfile />
              </RequireAuth>
            }
          />
          <Route path="/UnauthorizedPage" element={<UnauthorizedPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );

  return (
    <>
      <div>{child}</div>
    </>
  );
}

export default App;
// loading ? (
//   <></>
// ) : user ? (
//   dataState === "loading" ? (
//     <Typography>Getting your data...</Typography>
//   ) : dataState === "unauthenticated" ? (
//     <Typography>401 Error. User Unauthorized.</Typography>
//   ) : dataState === "Token has been revoked" ? (
//     <div>
//       <Typography>
//         Token has been revoked. Please reauthenticate or signOut() the user.
//       </Typography>
//       <div>
//         <button
//           onClick={() => {
//             signOut();
//           }}
//         >
//           Signout
//         </button>
//       </div>
//     </div>
//   ) : dataState === "success" ? (
//     <Home />
//   ) : undefined
// ) : undefined;

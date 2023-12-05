import "./App.css";
import { useAuth } from "./auth";
// import { Button, Typography, Box } from "@mui/material";
// import { Link } from "react-router-dom";
// import * as apiService from "./utils/api-service";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser, clearUser } from "./features/currentUser/currentUserSlice";
// import BottomNavBar from "./components/BottomNavbar";
// import { useLocation, Navigate } from "react-router-dom";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./routes/LogIn";
import Home from "./routes/Home";
import Register from "./routes/Register";
import BottomNavbar from "./components/BottomNavbar";
import Profile from "./routes/Profile";
import { RequireAuth, NoRequireAuth } from "./auth";
import Settings from "./routes/Settings";
function App() {
  const { user, loading, signOut, getRefreshToken, getUserIdToken } = useAuth();
  const [dataState, setDataState] = useState(undefined);
  // const usernameRef = useRef(undefined);
  // const dispatch = useDispatch();
  // const currentUserIdToken = useSelector((state) => state.currentUser.idToken);
  // let location = useLocation();
  // const currentUser = UserModel.fromMap(
  //   useSelector((state) => state.currentUser.user)
  // );
  useEffect(() => {
    (async () => {
      if (!loading) {
        if (user) {
          console.log("Authenticated User from Firebase", user);
          console.log("Fetching user details from the server ", user);
          setDataState("loading");
          try {
            const idToken = await getRefreshToken();
            console.log("Frontend Token view", idToken);

            const res = await apiService.getUserData({
              idToken: idToken,
              user: user,
            });

            console.log("FETCHED USER: ", res.user);
            // if (res.user) {
            //   dispatch(
            //     setUser({
            //       idToken,
            //       user: UserModel.fromMap(res.user).toMap(),
            //     })
            //   );
            // }
            // usernameRef.current = currentUser.uid;
            setDataState("success");
          } catch (error) {
            console.log("err", error);
            setDataState(error?.code);
          }
        }
      }
    })();
  }, [user, loading, dispatch, getUserIdToken, currentUserIdToken]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!loading && user) {
  //       try {
  //         console.log("Authenticated User from Firebase", user);
  //         console.log("Fetching user details from the server ", user);
  //         setDataState("loading");
  //         const userTempIdToken = await user.getIdToken(true);
  //         dispatch(
  //           setUser({ currentUser: user, currentUserIdToken: userTempIdToken })
  //         );
  //         await getUserDataWithRetry();
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //         if (
  //           error.error.code === "unauthenticated" ||
  //           error.error.code === "Token has been revoked"
  //         ) {
  //           // If the error is due to unauthenticated or revoked token, try to refresh the token
  //           try {
  //             console.log("userRetryIdToken", userRetryIdToken);
  //             const userRetryIdToken = await user.getIdToken(true);
  //             dispatch(
  //               setUser({
  //                 currentUser: user,
  //                 currentUserIdToken: userRetryIdToken,
  //               })
  //             );

  //             // Token refreshed successfully, retry the getUserData
  //             await getUserDataWithRetry();
  //           } catch (refreshError) {
  //             console.error("Error refreshing token:", refreshError);
  //             setDataState(refreshError.code);
  //           }
  //         } else {
  //           // If it's not an unauthenticated or revoked token error, set the dataState accordingly
  //           setDataState(error.error.code);
  //         }
  //       }
  //     }
  //   };

  //   const getUserDataWithRetry = async () => {
  //     try {
  //       const res = await apiService.getUserData({
  //         currentUserIdToken,
  //         userId: currentUser.uid,
  //       });
  //       usernameRef.current = res.user.username;
  //       setDataState("success");
  //     } catch (error) {
  //       console.error("Error fetching user data after token refresh:", error);
  //       setDataState(error.error.code);
  //     }
  //   };

  //   fetchData();
  // }, [user, loading, currentUserIdToken, currentUser.uid, dispatch]);
  const child =
    dataState === "loading" ? (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                  <BottomNavbar />
                </RequireAuth>
              }
            />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                  <BottomNavbar />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                  <BottomNavbar />
                </RequireAuth>
              }
            />
            <Route
              path="/settings"
              element={
                <RequireAuth>
                  <Settings />
                  <BottomNavbar />
                </RequireAuth>
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
          </Routes>
        </BrowserRouter>
      </>
    ) : (
      <>Loading User data</>
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

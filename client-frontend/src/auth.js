import * as apiService from "./utils/api-service";
import { useLocation, Navigate } from "react-router-dom";
import { useEffect, createContext, useContext } from "react";
import {
  getAuth,
  signInWithCustomToken,
  getIdToken,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserIdToken,
  clearUserIdToken,
} from "./features/currentUser/currentUserSlice";
export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.currentUser.token);
  const updateIdToken = (newIdToken) => {
    dispatch(setUserIdToken({ token: newIdToken }));
  };
  useEffect(() => {
    (async () => {
      if (!auth.loading) {
        if (auth.user) {
          console.log(
            "Middleware Authenticated User from Auth-Firebase",
            auth.user
          );
          try {
            const idToken = await auth.getRefreshToken();
            console.log("Frontend Token view", idToken);
            // const res = await apiService.getUserData({
            //   idToken: idToken,
            //   user: auth.user,
            // });
            if (idToken) {
              updateIdToken(idToken);
            }
          } catch (error) {
            console.log("err", error);
          }
        }
      }
    })();
  }, [auth.loading, auth.user]);

  return auth.loading ? (
    <></>
  ) : auth.user ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}
export function NoRequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  useEffect(() => {}, [auth.loading]);
  return auth.loading ? undefined : auth.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    children
  );
}
export const AuthContext = createContext(undefined);
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const getRefreshToken = async () => {
    return await getIdToken(user, true);
  };
  const getUserIdToken = async () => {
    return await user.getIdToken();
  };
  const signIn = async ({ email, password }) => {
    const { token } = await apiService.signIn({
      email,
      password,
    });

    await signInWithCustomToken(auth, token);
  };
  const signUp = async ({ email, password, username }) => {
    const { token } = await apiService.signUp({
      email,
      password,
      username,
    });
    await signInWithCustomToken(getAuth(), token);
  };
  const signOut = async () => {
    const auth = getAuth();
    await firebaseSignOut(auth);
  };
  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
    getRefreshToken,
    getUserIdToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

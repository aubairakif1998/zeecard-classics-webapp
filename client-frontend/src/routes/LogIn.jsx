import { useRef, useState, useEffect, useContext } from "react";
import "../styles/Login.css";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import isEmail from "is-email";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const userRef = useRef();
  const errRef = useRef();

  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  //   const [errMsg, setErrMsg] = useState("");
  //   const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [userEmail, pwd]);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrorMessage("Missing Username or Password");
    setIsSigningIn(true);
    try {
      await signIn({ email: userEmail, password: pwd });
      navigate("/");
    } catch (error) {
      const res = error.response;
      if (res) {
        const code = res.data?.error?.code;
        if (code === "user-not-found") {
          setErrorMessage("No user has this email");
          return;
        }
        if (code === "wrong-password") {
          setErrorMessage("Email / password is wrong.");
          return;
        }
      }
      setErrorMessage("Invalid Inputs");
    } finally {
      setIsSigningIn(false);
    }
    // try {
    //   //   const response = await axios.post(
    //   //     LOGIN_URL,
    //   //     JSON.stringify({ user, pwd }),
    //   //     {
    //   //       headers: { "Content-Type": "application/json" },
    //   //       withCredentials: true,
    //   //     }
    //   //   );
    //   //   console.log(JSON.stringify(response?.data));
    //   //   //console.log(JSON.stringify(response));
    //   //   const accessToken = response?.data?.accessToken;
    //   //   const roles = response?.data?.roles;
    //   //   setAuth({ user, pwd, roles, accessToken });
    //   //   setUser("");
    //   //   setPwd("");
    //   //   setSuccess(true);
    // } catch (err) {
    //   //   if (!err?.response) {
    //   //     setErrMsg("No Server Response");
    //   //   } else if (err.response?.status === 400) {
    //   //     setErrMsg("Missing Username or Password");
    //   //   } else if (err.response?.status === 401) {
    //   //     setErrMsg("Unauthorized");
    //   //   } else {
    //   //     setErrMsg("Login Failed");
    //   //   }
    //   //   errRef.current.focus();
    // }
  };
  return (
    <>
      <div className="main">
        <h1>Welcome Back!</h1>
        <br></br>
        <h2>We’ve missed you! Log in with your e-mail</h2>
        <p>or your social account</p>
        <section className="section-login">
          <p
            ref={errRef}
            className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <br />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              className="input-textField"
              type="text"
              id="email"
              ref={userRef}
              placeholder="Email:"
              autoComplete="off"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              className="input-textField"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />{" "}
            <br></br>
            <p style={{ alignSelf: "center" }}>or your social account</p>
            <button className="btn-logIn">Log In</button>
            <LinearProgress
              variant="indeterminate"
              sx={{
                visibility: isSigningIn ? "visible" : "hidden",
                marginTop: 2,
              }}
            />
          </form>
        </section>{" "}
        <p>
          Need an Account?
          <span className="line" style={{ margin: "10px" }}>
            <a href="/signup">Sign Up</a>
          </span>
        </p>
        <a className="a-forgotPassword" href="#">
          Forgot password?
        </a>
      </div>
    </>
  );
};
export default Login;

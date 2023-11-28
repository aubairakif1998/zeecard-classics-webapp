import { useRef, useState, useEffect } from "react";
import "../styles/Register.css";
import {
  faCheck,
  faTimes,
  faEye,
  faInfoCircle,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isEmail from "is-email";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [userEmailFocus, setUserEmailFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isSigningUp, setIsSigningUp] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(userEmail));
  }, [userEmail]);
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, userEmail, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(userEmail);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = USER_REGEX.test(user);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");

      return;
    }
    console.log(user, userEmail, pwd);
    setIsSigningUp(true);

    try {
      await signUp({ email: userEmail, password: pwd, username: user });
      navigate("/");
    } catch (error) {
      console.log(error?.response);
      if (error?.response) {
        if (error?.response.status === 500) {
          setErrMsg("Internal server error");
        } else {
          setErrMsg(error?.response.data.error.code);
        }
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <>
      {
        <div className="main">
          <section className="section-signup">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="heading">New Account</h1>
            <br></br>
            <p className="subheading">
              Create your account with your e-mail
            </p>{" "}
            <br></br>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? "hide" : "invalid"}
                />
              </label>{" "}
              <input
                className="input-textFieldSignUp"
                type="text"
                id="username"
                placeholder="Jami"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />{" "}
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                {/* 4 to 24 characters.  */}
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <br></br>
              <label htmlFor="useremail">
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !userEmail ? "hide" : "invalid"}
                />
              </label>
              <input
                className="input-textFieldSignUp"
                type="text"
                id="useremail"
                placeholder="jammy@gmail.com"
                autoComplete="off"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uEmailnote"
                onFocus={() => setUserEmailFocus(true)}
                onBlur={() => setUserEmailFocus(false)}
              />
              <p
                id="uEmailnote"
                className={
                  userEmailFocus && userEmail && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Start with a sequence of characters, including letters, numbers,
                and other characters.
                <br />
                Use the "@" symbol to separate the local part from the domain
                part.
              </p>
              <br></br>
              <label htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>
              <div>
                <input
                  className="input-textFieldSignUp"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <span
                  className="password-toggle "
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesomeIcon
                    icon={!passwordVisible ? faEyeSlash : faEye}
                  />
                </span>
              </div>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
              <br></br>
              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
                className="input-textFieldSignUp"
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
              <br></br>
              <button
                className={
                  !validEmail || !validPwd || !validMatch
                    ? `disabledBtn btn-Signup`
                    : "enabledbtn btn-Signup"
                }
                disabled={
                  !validEmail || !validPwd || !validMatch ? true : false
                }
              >
                Sign Up
              </button>
              <LinearProgress
                variant="indeterminate"
                sx={{
                  marginTop: 2,
                  color: "primary",
                  visibility: isSigningUp ? "visible" : "hidden",
                }}
              />
            </form>
            <p className="subheading">or your social account</p>
            <p className="subheading">
              By signing up, you are accepting our Terms & Conditions.
            </p>
            <p>
              Already registered?
              <br />
              <span className="line">
                <a href="/signIn">Sign In</a>
              </span>
            </p>
          </section>
        </div>
      }
    </>
  );
};

export default Register;

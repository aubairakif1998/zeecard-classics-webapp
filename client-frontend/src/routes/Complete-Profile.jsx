import { useRef, useState, useEffect } from "react";
import "../styles/CompleteProfile.css";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { LinearProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import * as apiService from "../utils/api-service";
import { useAuth } from "../auth";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const CompleteProfile = () => {
  const userNameRef = useRef();
  const errRef = useRef();
  const { user, getRefreshToken } = useAuth();
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [validuserName, setValiduserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  useEffect(() => {
    userNameRef.current.focus();
  }, []);
  useEffect(() => {
    setValiduserName(USER_REGEX.test(userName));
  }, [userName]);
  useEffect(() => {
    setErrMsg("");
  }, [userName]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v3 = USER_REGEX.test(userName);
    if (!v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(user);
    setIsSigningUp(true);
    try {
      const res = await apiService.completeProfile({
        user,
        idToken: await getRefreshToken(),
        username: userName,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
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

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validuserName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validuserName || !userName ? "hide" : "invalid"}
                />
              </label>{" "}
              <input
                className="input-textFieldSignUp"
                type="text"
                id="username"
                placeholder="Jami"
                ref={userNameRef}
                autoComplete="off"
                onChange={(e) => setuserName(e.target.value)}
                value={userName}
                required
                aria-invalid={validuserName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}
              />{" "}
              <br></br>
              <button
                className={
                  !validuserName
                    ? `disabledBtn btn-Signup`
                    : "enabledbtn btn-Signup"
                }
                disabled={!validuserName ? true : false}
              >
                Confirm
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
          </section>
        </div>
      }
    </>
  );
};

export default CompleteProfile;

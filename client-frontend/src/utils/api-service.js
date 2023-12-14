import axios from "axios";
import { CLOUD_FUNCTIONS_ORIGIN } from "../functions-origin";

const apiUrl = `${CLOUD_FUNCTIONS_ORIGIN}`;

export async function signIn({ email, password }) {
  console.log(apiUrl);
  const url = `${apiUrl}/login`;
  const res = await axios.post(url, { email, password });
  return res.data;
}

export async function signUp({ email, password, username }) {
  const url = `${apiUrl}/register`;
  const res = await axios.post(url, {
    email,
    password,
    username,
  });
  return res.data;
}

export async function getUserData({ idToken, uid }) {
  let res;

  try {
    const url = `${apiUrl}/users/${uid}`;
    res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${idToken}`,
      },
    });

    return { found: true, data: res.data };
  } catch (err) {
    console.log("Error while fetching user data", err.response.data);
    if (err.response.data.error.code === "user-not-found") {
      console.log("USER NOT FOUND");
      return { found: false };
    }
    throw err.response.data;
  }
}
export async function completeProfile({ user, idToken, username }) {
  try {
    const url = `${apiUrl}/users/${user.uid}/complete-profile`;
    const res = await axios.post(
      url,
      {
        username,
        email: user.email,
        uid: user.uid,
      },
      {
        headers: {
          authorization: `Bearer ${idToken}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.log("Error while completing profile", err);
  }
}
// export async function verifyUserIdToken({ idToken }) {
//   let res;
//   try {
//     const url = `${apiUrl}/users/${user.uid}`;
//     res = await axios.get(url, {
//       headers: {
//         authorization: `Bearer ${idToken}`,
//       },
//     });

//     return res.data;
//   } catch (err) {
//     console.log("Error while fetching user data", err.response.data);
//     throw err.response.data;
//   }
// }

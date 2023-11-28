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

export async function getUserData({ idToken, user }) {
  let res;
  try {
    const url = `${apiUrl}/users/${user.uid}`;
    res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${idToken}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log("Error while fetching user data", err.response.data);
    throw err.response.data;
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

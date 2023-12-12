// const { getAuth } = require("firebase-admin/auth");

// async function firebaseAuth(req, res, next) {
//   const regex = /Bearer (.+)/i;
//   try {
//     const idToken = req.headers["authorization"].match(regex)?.[1];
//     req.token = await getAuth().verifyIdToken(idToken);
//     next();
//   } catch (err) {
//     res.status(401).json({ error: { code: "unauthenticated" } });
//   }
// }

// module.exports = firebaseAuth;
const { getAuth } = require("firebase-admin/auth");

const firebaseAuth = async (req, res, next) => {
  const regex = /Bearer (.+)/i;
  try {
    let checkRevoked = true;
    const idToken = req.headers["authorization"].match(regex)?.[1];
    console.log("ID-TOKEN: ", idToken);
    const res = await getAuth().verifyIdToken(idToken, checkRevoked);
    if (res) {
      console.log(res);
    }
    req.token = await getAuth().verifyIdToken(idToken, checkRevoked);

    next();
  } catch (err) {
    if (err.code == "auth/user-disabled") {
      res.status(401).json({
        error: {
          code: "The corresponding user is disabled. ",
          message:
            "The corresponding user is disabled. Inform the admin to enable your account.",
        },
      });
    } else if (err.code == "auth/id-token-revoked") {
      res.status(401).json({
        error: {
          code: "Token has been revoked",
          message:
            "Token has been revoked. Inform the user to reauthenticate or signOut() the user.",
        },
      });
      // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
    } else {
      res.status(401).json({ error: { code: "unauthenticated" } });
    }
  }
};

// export default firebaseAuth;
module.exports = firebaseAuth;

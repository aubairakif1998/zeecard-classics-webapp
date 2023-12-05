const {
  getAuth: getClientAuth,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const credential = await signInWithEmailAndPassword(
      getClientAuth(),
      email,
      password
    );
    const token = await getAdminAuth().createCustomToken(credential.user.uid);
    res.status(200).json({ token });
  } catch (error) {
    console.log("ERROR", error.code, "CLOSE");
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      res.status(403);
    } else if (error.code === "auth/user-disabled") {
      res.status(401);
    }
    res.json({
      error: { code: error.code.replace("auth/", "") },
    });
  }
};

// export default login;
module.exports = login;

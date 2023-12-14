const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");
const isUserNameAlreadyTaken = require("../services/check-username-InDb");
const { createUserInFirestore } = require("../services/createUser");

const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (await isUserNameAlreadyTaken(username)) {
      res.status(400).send({ error: { code: "username-already-taken" } });
      return;
    }
    const auth = getAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const adminAuth = getAdminAuth();
    const token = await adminAuth.createCustomToken(credential.user.uid);
    await createUserInFirestore(credential.user.uid, email, username);
    res.status(201).json({ token });
  } catch (err) {
    const { code } = err;
    if (code === "auth/email-already-in-use") {
      res.status(400);
    } else {
      console.log(err);
      res.status(500);
    }
    res.json({
      error: {
        code: code ? code.replace("auth/", "") : undefined,
      },
    });
  }
};

module.exports = register;

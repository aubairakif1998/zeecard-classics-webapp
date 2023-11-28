const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");
const firestore = require("firebase-admin").firestore();
const UserModel = require("../models/user_model");
const Database = require("../services/database");
const getRandomString = require("../utils/random"); // Adjust the path
const { DateTime } = require("luxon"); // Assuming you're using Luxon for DateTime
const db = new Database();
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

    const user = new UserModel({
      email,
      name: "",
      uid: credential.user.uid,
      username,
      directLink: "",
      isPrivate: false,
      joinDate: DateTime.now(),
      uniqueHandle: await getRandomHandle(),
    });
    const userDocRef = firestore.doc(`userstest/${credential.user.uid}`);
    const userDocSnapshot = await userDocRef.get();

    if (!userDocSnapshot.exists) {
      console.log("Creating a new user");
      await userDocRef.set(user.toMap());
    }

    // // await firestore.doc(`userstest/${credential.user.uid}`).set({ username });

    res.status(201).json({ token, user });
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

const isUserNameAlreadyTaken = async (username) => {
  const usersCollection = firestore.collection("userstest");
  const query = usersCollection.where("username", "==", username);
  const querySnapshot = await query.get();
  if (!querySnapshot.empty) {
    return true;
  }
  return false;
};

const getRandomHandle = async () => {
  let gotUnique = false;
  let finalHandle = "";

  while (!gotUnique) {
    const handle = getRandomString(5);
    const queryDocs = await db.usersCollection
      .where("uniqueHandle", "==", handle)
      .get();

    if (queryDocs.docs.length > 0) {
      gotUnique = false;
    } else {
      gotUnique = true;
      finalHandle = handle;
    }
  }

  return finalHandle;
};
module.exports = register;
// const usersCollection = firestore.collection("userstest");
// const query = usersCollection.where("username", "==", username);
// const querySnapshot = await query.get();
// if (!querySnapshot.empty) {
//   res.status(400).send({ error: { code: "username-already-taken" } });
//   return;
// }

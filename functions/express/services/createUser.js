const firestore = require("firebase-admin").firestore();
const UserModel = require("../models/user_model");
const Database = require("./database");
const getRandomString = require("../utils/random");
const { DateTime } = require("luxon");
const db = new Database();
const createUserInFirestore = async (uid, email, username) => {
  try {
    const user = new UserModel({
      email,
      name: "",
      uid,
      username,
      directLink: "",
      isPrivate: false,
      joinDate: DateTime.now(),
      uniqueHandle: await getRandomHandle(),
    });

    const userDocRef = firestore.doc(`userstest/${uid}`);
    const userDocSnapshot = await userDocRef.get();

    if (!userDocSnapshot.exists) {
      console.log("Creating a new user");
      await userDocRef.set(user.toMap());
    }
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    throw error;
  }
};

const getRandomHandle = async () => {
  try {
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
  } catch (error) {
    console.error("Error generating random handle:", error);
    throw error;
  }
};

module.exports = {
  createUserInFirestore,
  getRandomHandle,
};

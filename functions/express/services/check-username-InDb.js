const firestore = require("firebase-admin").firestore();
const isUserNameAlreadyTaken = async (username) => {
  const usersCollection = firestore.collection("userstest");
  const query = usersCollection.where("username", "==", username);
  const querySnapshot = await query.get();
  if (!querySnapshot.empty) {
    return true;
  }
  return false;
};

module.exports = isUserNameAlreadyTaken;

const admin = require("firebase-admin");
const UserModel = require("../models/user_model");
const firestore = admin.firestore();

class Database {
  get usersCollection() {
    return firestore.collection("userstest");
  }

  linksCollection(uid) {
    return this.usersCollection.doc(uid).collection("links");
  }

  connectionsCollections(uid) {
    return this.usersCollection.doc(uid).collection("connections");
  }

  get reportsCollection() {
    return firestore.collection("/reports");
  }

  get verificationRequestsCollection() {
    return firestore.collection("/verificationRequests");
  }

  async getUser(uid) {
    // if (uid.length === 5) {
    //   const queryDocs = await this.usersCollection
    //     .where("uniqueHandle", "==", uid)
    //     .get();

    //   if (queryDocs.docs.length > 0) {
    //     return new UserModel(queryDocs.docs[0].data());
    //   }
    // }

    const userDocRef = firestore.doc(`userstest/${uid}`);
    const userDocSnapshot = await userDocRef.get();

    if (userDocSnapshot.exists) {
      return new UserModel(userDocSnapshot.data());
    }

    // const doc = await this.usersCollection.doc(uid).get();
    // if (doc.exists) {
    //   return new UserModel(doc.data());
    // }

    // const queryDocsByUsername = await this.usersCollection
    //   .where("username", "==", uid)
    //   .get();

    // if (queryDocsByUsername.docs.length > 0) {
    //   return new UserModel(queryDocsByUsername.docs[0].data());
    // }

    return null;
  }
}
module.exports = Database;

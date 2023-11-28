// const firestore = require("firebase-admin").firestore();

// const getUser = async (req, res) => {
//   const userId = req.params.id;
//   if (!userId) {
//     res.status(400).json({ error: { code: "no-user-id" } });
//     return;
//   }

//   if (userId !== req.token.uid) {
//     res.status(403).json({ error: { code: "unauthorized" } });
//   }

//   const snapshot = await firestore.collection("userstest").doc(userId).get();
//   if (!snapshot.exists) {
//     res.status(404).json({ error: { code: "user-not-found" } });
//     return;
//   }
//   const user = snapshot.data();

//   res.status(200).json({ username: user.username });
// };

// module.exports = getUser;

// const firestore = require("firebase-admin").firestore();
// const UserModel = require("../models/user_model").default;

// const getUser = async (req, res) => {
//   const userId = req.params.id;

//   if (!userId) {
//     res.status(400).json({ error: { code: "no-user-id" } });
//     return;
//   }

//   if (userId !== req.token.uid) {
//     res.status(403).json({ error: { code: "unauthorized" } });
//     return;
//   }

//   try {
//     const snapshot = await firestore.collection("userstest").doc(userId).get();

//     if (!snapshot.exists) {
//       res.status(404).json({ error: { code: "user-not-found" } });
//       return;
//     }

//     const userData = snapshot.data();
//     const user = new UserModel(userData);

//     res.status(200).json({
//       user: {
//         uid: user.uid,
//         uniqueHandle: user.uniqueHandle,
//         username: user.username,
//         email: user.email,
//         name: user.name,
//         bio: user.bio,
//         links: user.links.map((link) => link.toMap()),
//         dob: user.dob ? user.dob.getTime() : null,
//         gender: user.gender,
//         profilePicture: user.profilePicture,
//         isVerified: user.isVerified,
//         timesZeecard: user.timesZeecard,
//         isPrivate: user.isPrivate,
//         directLink: user.directLink,
//         joinDate: user.joinDate ? user.joinDate.getTime() : null,
//         linkSequence: user.linkSequence,
//         url: user.url,
//         sharedUrl: user.sharedUrl,
//       },
//     });
//   } catch (error) {
//     console.error("Error getting user data:", error);
//     res.status(500).json({ error: { code: "internal-server-error" } });
//   }
// };

// module.exports = getUser;

// const admin = require("firebase-admin");
const Database = require("../services/database");
// const UserModel = require("../models/user_model");

const database = new Database();

const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    res.status(400).json({ error: { code: "no-user-id" } });
    return;
  }

  if (userId !== req.token.uid) {
    res.status(403).json({ error: { code: "unauthorized" } });
    return;
  }

  try {
    const user = await database.getUser(userId);

    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(404).json({ error: { code: "user-not-found" } });
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ error: { code: "internal-server-error" } });
  }
};

module.exports = getUser;

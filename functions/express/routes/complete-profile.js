const { createUserInFirestore } = require("../services/createUser");
const isUserNameAlreadyTaken = require("../services/check-username-InDb"); // Adjust the path

const completeProfile = async (req, res) => {
  const { email, username, uid } = req.body;
  try {
    if (await isUserNameAlreadyTaken(username)) {
      res.status(400).send({ error: { code: "username-already-taken" } });
      return;
    }
    const userId = req.params.id;
    if (!userId) {
      res.status(400).json({ error: { code: "no-user-id" } });
      return;
    }

    if (userId !== req.token.uid) {
      res.status(403).json({ error: { code: "unauthorized" } });
      return;
    }
    await createUserInFirestore(uid, email, username);
    res.status(201).json({
      message: "user successfully created in firestore",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

module.exports = completeProfile;

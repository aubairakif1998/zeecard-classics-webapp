const Database = require("../services/database");
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

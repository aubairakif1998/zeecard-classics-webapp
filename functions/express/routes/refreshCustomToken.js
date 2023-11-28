const {
  getAuth: getClientAuth,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");

const refreshCustomToken = async (req, res) => {
  const userId = req.params.id;
  try {
    const expiresIn = 5 * 60 * 1000; // 5 minutes in milliseconds
    const expirationTime = Date.now() + expiresIn;

    const token = await getAdminAuth().createCustomToken(
      userId,
      {
        // Add custom claims if needed
      },
      {
        expiresIn,
      }
    );
    res.cookie("sessionToken", token, {
      httpOnly: true,
      expires: new Date(expirationTime),
    });

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    // Handle error
    console.error("Error refreshing custom token:", error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
};

module.exports = refreshCustomToken;

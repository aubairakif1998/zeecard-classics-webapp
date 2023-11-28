/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// const { onRequest } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const validateEmailAndPassword = require("./express/middleware/validate-email-and-password");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
// Initialize cookie-parser middleware
const validateLoginDetails = require("./express/middleware/validate-login");
const firebaseConfig = require("./firebase.config");
const { initializeApp } = require("firebase/app");
const cors = require("cors");
const morgan = require("morgan");
const serviceAccount = require("./service-account-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
initializeApp(firebaseConfig);

const register = require("./express/routes/register");
const login = require("./express/routes/login");
const refreshCustomToken = require("./express/routes/refreshCustomToken");
const firebaseAuth = require("./express/middleware/firebase-auth");
const getUser = require("./express/routes/get-user");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["1234567890"],
    maxAge: 5 * 60 * 1000, // 24 hours
  })
);
app.use(cookieParser());
app.post("/login", validateLoginDetails, login);
app.post("/register", validateEmailAndPassword, register);
app.get("/users/:id", firebaseAuth, getUser);
app.get("/refresh-token/:id", refreshCustomToken);
exports.api = functions.https.onRequest(app);
// exports.api = functions.https.onRequest(app);
// exports.api = onRequest(app);

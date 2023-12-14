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
require("dotenv").config();

const adminFirebaseApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.APP_CRED)),
});
if (adminFirebaseApp) {
  console.log("Admin Firebase app initialized");
}
const firebaseApp = initializeApp(firebaseConfig);
if (firebaseApp) {
  console.log("Firebase app initialized");
}

const register = require("./express/routes/register");
const login = require("./express/routes/login");
// const refreshCustomToken = require("./express/routes/refreshCustomToken");
const firebaseAuth = require("./express/middleware/firebase-auth");
const getUser = require("./express/routes/get-user");
const completeProfile = require("./express/routes/complete-profile");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.post("/login", validateLoginDetails, login);
app.post("/register", validateEmailAndPassword, register);
app.get("/users/:id", firebaseAuth, getUser);
app.post("/users/:id/complete-profile", firebaseAuth, completeProfile);
// app.get("/refresh-token/:id", refreshCustomToken);
exports.api = functions.https.onRequest(app);

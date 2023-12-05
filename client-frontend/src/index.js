import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import ReactDOM from "react-dom/client";
import store from "./app/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="1079032458211-12mqpaado2hbvgskq59jjfmqs9i8mvni.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </AuthProvider>
);

reportWebVitals();

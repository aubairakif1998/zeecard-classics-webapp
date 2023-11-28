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
initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./store";
import "./styles/index.css";

import firebase from "firebase/app";
import { firebaseConfig } from "./config/firebase.config";
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

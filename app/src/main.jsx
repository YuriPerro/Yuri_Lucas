import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";

import firebase from "firebase/app";
import { firebaseConfig } from "./config/firebase.config";
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

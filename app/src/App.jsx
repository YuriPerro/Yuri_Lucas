import React from "react";
import Routes from "./Routes";
import firebase from "firebase/app";

import { firebaseConfig } from "./config/firebase.config";

// Inicializa o app firebase no projeto
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="app min-h-screen flex flex-col items-center bg-purple-600  text-base text-white">
      <Routes />
    </div>
  );
}

export default App;

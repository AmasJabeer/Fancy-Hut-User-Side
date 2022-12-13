import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { UserContext, UserProvider } from "./context/user.context";
import {FirebaseContextProvider} from './context/FirebaseContext'
import {UserAuthContextProvider} from './context/UserAuthContext'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <FirebaseContextProvider>
            <UserAuthContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
            </UserAuthContextProvider>
        </FirebaseContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

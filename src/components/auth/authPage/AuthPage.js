import React from "react";
import { browserHistory } from "react-router";
import {
  authContainer,
  auth,
  message,
  buttonsContainer,
  button
} from "./authPage.css";

const AuthPage = () => {
  const goToRegister = () => browserHistory.push("/register");
  const goToLogIn = () => browserHistory.push("/login");

  return (
    <main className={authContainer}>
      <div className={auth}>
        <div className={message}>
          <h1>Hello!</h1>
          <h2>Register to enjoy all the possibilities</h2>
        </div>
        <div className={buttonsContainer}>
          <button className={button} onClick={goToLogIn}>
            I have an account
          </button>
          <button className={button} onClick={goToRegister}>
            I am a new user
          </button>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;

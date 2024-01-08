import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthContext";
import "./LandingPage.css";

function LandingPage() {
  const { setAuth } = useContext(AuthContext);

  /**
   * Set the text input to the error state.
   * Red border red text
   * @param {HTMLInputElement} inputElem
   * @returns {void}
   */
  function setInputToErrorState(inputElem) {
    inputElem.style.boxShadow = "0 0 20px #e57373";
    inputElem.style.color = "#e57373";
  }

  /**
   * Set the text input to the default state.
   * No border, black text
   * @param {HTMLInputElement} inputElem
   * @returns {void}
   */
  function setInputToDefaultState(inputElem) {
    inputElem.style.boxShadow = "0px 0px 10px #0000001a";
    inputElem.style.color = "";
  }

  /**
   * Verify that the server text fits the requirements for a server address.
   * If it does not, set the error message and draw the border around the text
   * input as red.
   * @returns {bool}  True if the server text is valid, false otherwise.
   */
  function validateServer() {
    let errorStr = "";

    // Get references to the required divs
    const errMsgElem = document.getElementById("errorMessage");
    const serverTextInput = document.getElementById("serverTextInput");
    if (errMsgElem === null || serverTextInput === null) {
      console.error("Could not find required elements.");
      return false;
    }

    // Grab the server text from the dedicated text box
    const serverText = serverTextInput.value.trim();

    // Check that anything was provided
    if (serverText === "") {
      errorStr = "Please provide a server address.";
    }

    // Test that the IP is an ip4v
    const ipRegExp = RegExp(/^(\d{1,3}.){3}\d{1,3}$/);
    if (!ipRegExp.test(serverText)) {
      errorStr = "Please provide a valid IPv4 address.";
    }

    // If there is a validation error, set the error message.
    // And draw the border around the text input as red.
    if (errorStr !== "") {
      errMsgElem.innerHTML = errorStr;
      setInputToErrorState(serverTextInput);
      return false;
    }

    // If everything was valid, then clear any error messages or borders.
    // And return true.
    errMsgElem.innerHTML = "";
    setInputToDefaultState(serverTextInput);

    return true;
  }

  /**
   * Verify that the password text fits the requirements for a server address.
   * If it does not, set the error message and draw the border around the text
   * input as red.
   * @returns {bool}  True if the password text is valid, false otherwise.
   */
  function validatePassword() {
    let errorStr = "";

    // Get references to the required divs
    const errMsgElem = document.getElementById("errorMessage");
    const passwordTextInput = document.getElementById("passwordTextInput");
    if (errMsgElem === null || passwordTextInput === null) {
      console.error("Could not find required elements.");
      return false;
    }

    // Grab the server text from the dedicated text box
    const passwordText = passwordTextInput.value.trim();

    // Check that anything was provided
    if (passwordText === "") {
      errorStr = "Please provide a password.";
    }

    // If there is a validation error, set the error message.
    // And draw the border around the text input as red.
    if (errorStr !== "") {
      errMsgElem.innerHTML = errorStr;
      setInputToErrorState(passwordTextInput);
      return false;
    }

    // If everything was valid, then clear any error messages or borders.
    // And return true.
    errMsgElem.innerHTML = "";
    setInputToDefaultState(passwordTextInput);

    return true;
  }

  /**
   * Run validations on the text inputs,
   * then submit the data to the user specified server.
   * @param {React.FocusEvent<HTMLFormElement>} event
   * @returns {void}
   */
  function submitCb(event) {
    // Prevent the page from refreshing.
    event.preventDefault();

    // Run validations on the server address and password.
    if (!validateServer() || !validatePassword()) {
      return;
    }

    // TODO: Validate the inputs.
    console.log(event);
  }

  return (
    <div className="LandingPage">
      <h1>
        Lux <br /> Media Server
      </h1>

      <form onSubmit={submitCb}>
        <input
          id="serverTextInput"
          type="text"
          placeholder="Server Address"
          onFocus={(event) => setInputToDefaultState(event.target)}
          onBlur={validateServer}
        />
        <input
          id="passwordTextInput"
          type="password"
          placeholder="Password"
          onFocus={(event) => setInputToDefaultState(event.target)}
          onBlur={validatePassword}
        />
        <button type="submit">Submit</button>
        <p id="errorMessage"></p>
      </form>
    </div>
  );
}

export default LandingPage;

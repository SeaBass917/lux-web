import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../Auth/AuthContext";
import "./LandingPage.css";

import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

function LandingPage() {
  const [alertText, setAlertText] = useState("");
  const [isServerValid, setIsServerValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const textFieldServerRef = useRef();
  const textFieldPasswordRef = useRef();
  const { setAuth } = useContext(AuthContext);

  const handleKeyDown = (event, nextInput) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextInput.current.focus();
    }
  };

  /**
   * Verify that the server text fits the requirements for a server address.
   * If it does not, set the error message and draw the border around the text
   * input as red.
   * @returns {bool}  True if the server text is valid, false otherwise.
   */
  function validateServer() {
    // Get references to the required divs
    const serverTextInput = document.getElementById("serverTextInput");
    if (serverTextInput === null) {
      console.error("Could not find required elements.");
      setIsServerValid(false);
      return false;
    }

    // Grab the server text from the dedicated text box
    const serverText = serverTextInput.value.trim();

    // Check that anything was provided
    if (serverText === "") {
      setAlertText("Please provide a server address.");
      setIsServerValid(false);
      return false;
    }

    // Test that the IP is an ip4v address
    if (!RegExp(/^(\d{1,3}.){3}\d{1,3}$/).test(serverText)) {
      setAlertText("Please provide a valid IPv4 address.");
      setIsServerValid(false);
      return false;
    }

    // If everything was valid, then clear the error borders.
    // And return true.
    setIsServerValid(true);
    if (isPasswordValid) setAlertText("");
    return true;
  }

  /**
   * Verify that the password text fits the requirements for a server address.
   * If it does not, set the error message and draw the border around the text
   * input as red.
   * @returns {bool}  True if the password text is valid, false otherwise.
   */
  function validatePassword() {
    // Get references to the required divs
    const passwordTextInput = document.getElementById("passwordTextInput");
    if (passwordTextInput === null) {
      console.error("Could not find required element(s).");
      setIsPasswordValid(false);
      return false;
    }

    // Grab the server text from the dedicated text box
    const passwordText = passwordTextInput.value.trim();

    // Check that anything was provided
    // If there is a validation error, set the error message.
    // And draw the border around the text input as red.
    if (passwordText === "") {
      setAlertText("Please provide a password.");
      setIsPasswordValid(false);
      return false;
    }

    // If everything was valid, then clear the error borders.
    // And return true.
    setIsPasswordValid(true);
    if (isServerValid) setAlertText("");
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

  const theme = useTheme();
  return (
    <div className="LandingPage">
      <h1
        style={{
          color: theme.palette.primary.main,
        }}
      >
        Lux <br /> Media Server
      </h1>

      <form onSubmit={submitCb}>
        <TextField
          id="serverTextInput"
          label="Server Address"
          inputRef={textFieldServerRef}
          error={!isServerValid}
          onFocus={(event) => {
            setIsServerValid(true);
          }}
          onBlur={validateServer}
          onKeyDown={(event) => handleKeyDown(event, textFieldPasswordRef)}
        />
        <TextField
          id="passwordTextInput"
          type="password"
          label="Password"
          inputRef={textFieldPasswordRef}
          error={!isPasswordValid}
          onFocus={(event) => {
            setIsPasswordValid(true);
          }}
          onBlur={validatePassword}
        />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
        <Collapse in={alertText !== ""}>
          <Alert severity="error" variant="outlined">
            {alertText}
          </Alert>
        </Collapse>
      </form>
    </div>
  );
}

export default LandingPage;

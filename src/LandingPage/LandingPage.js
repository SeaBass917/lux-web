import React, { useContext, useState, useRef, useEffect } from "react";

import { AuthContext } from "../Auth/AuthContext";
import { getPepper, getAuthToken } from "../Server/ServerInterface";
import "./LandingPage.css";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

function LandingPage() {
  const [alertText, setAlertText] = useState("");
  const [isServerValid, setIsServerValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const textFieldServerRef = useRef();
  const textFieldPasswordRef = useRef();
  const { auth, setAuth } = useContext(AuthContext);

  /**
   * Handler so that the TextFields don't submit on enter, but instead
   * move to the next input.
   * @param {React.KeyboardEvent<HTMLDivElement>} event
   * @param {React.RefObject<HTMLInputElement>} nextInput
   * @returns {void}
   */
  function handleEnterKeyDown(event, nextInput) {
    if (event.key === "Enter") {
      event.preventDefault();
      nextInput.current.focus();
    }
  }

  /**
   * Verify that the server text fits the requirements for a server address.
   * If it does not, set the error message and draw the border around the text
   * input as red.
   * @returns {bool}  True if the server text is valid, false otherwise.
   */
  function validateServer(setAlert = true) {
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
      if (setAlert) setAlertText("Please provide a server address.");
      setIsServerValid(false);
      return false;
    }

    // Test that the IP is an ip4v address
    if (!RegExp(/^(\d{1,3}.){3}\d{1,3}$/).test(serverText)) {
      if (setAlert) setAlertText("Please provide a valid IPv4 address.");
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
  function validatePassword(setAlert = true) {
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
      if (setAlert) setAlertText("Please provide a password.");
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
    // And flag the submit button event so that validations can run.
    event.preventDefault();

    // Run validations on the server address and password.
    if (!validateServer() || !validatePassword()) {
      return;
    }

    // Get the address and password
    const address = textFieldServerRef.current.value.trim();
    const password = textFieldPasswordRef.current.value.trim();

    // Get the pepper for hashing the password
    // Then, get the auth token
    getPepper(address)
      .then((pepper) => {
        getAuthToken(address, password, pepper)
          .then((authToken) => {
            // Store the pepper token and server address in the auth context
            // This will trigger a redirect to the video homepage
            setAuth({
              pepper: pepper,
              server: address,
              token: authToken,
            });
          })
          .catch((error) => {
            setAlertText(error?.response?.data);
          });
      })
      .catch((error) => {
        setAlertText(error.message);
      });
  }

  // When the page loads, check if the user is already logged in.
  // If they are, redirect them to the video homepage.
  useEffect(() => {
    // Loa the last successful server address from local storage
    if (auth.server) {
      textFieldServerRef.current.value = auth.server;
    }

    if (auth.token) {
      // Redirect to the video homepage
      window.location.href = "/video";
    }
  }, [auth]);

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
          onKeyDown={(event) => handleEnterKeyDown(event, textFieldPasswordRef)}
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

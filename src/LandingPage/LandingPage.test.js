import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";

/**
 * Tests that the LandingPage title is present.
 */
test("Title is present", () => {
  render(<LandingPage />);
  const titleElement = screen.getByText(/Lux Media Server/i);
  expect(titleElement).toBeInTheDocument();
});

/**
 * Tests that the LandingPage correctly grabs the last known IP address from
 * local storage.
 */
test("Loads last known Server Address", () => {
  // Create a fake local storage
  const localStorageMock = (function () {
    let store = {};

    return {
      getItem: function (key) {
        return store[key];
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
    };
  })();

  // Mock the local storage
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });

  // Set the server address
  localStorage.setItem("server", "123.456.789.0");

  // Render the component
  render(<LandingPage />);
  const serverAddressTextInput = document.getElementById("serverTextInput");
  expect(serverAddressTextInput).toBeInTheDocument();

  // Check that the server address is correct
  expect(serverAddressTextInput.value).toBe("123.456.789.0");
});

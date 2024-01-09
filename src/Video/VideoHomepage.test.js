import { render, screen } from "@testing-library/react";
import VideoHomepage from "./VideoHomepage";
import { AuthContext } from "../Auth/AuthContext";

const renderWithAuthContext = (component, authValue) => {
  return {
    ...render(
      <AuthContext.Provider value={authValue}>{component}</AuthContext.Provider>
    ),
  };
};

test("todo", () => {
  const authValue = {
    auth: { token: "test-token", server: "123.456.789.0", pepper: "EwPepper" },
    setAuth: jest.fn(),
  };
  const { getByText } = renderWithAuthContext(<VideoHomepage />, authValue);
  expect(true);
});

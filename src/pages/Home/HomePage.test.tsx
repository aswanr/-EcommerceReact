import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./homePage"; 
import { decodeToken } from "../../authentication/AuthContext";

jest.mock("../../authentication/AuthContext", () => ({
  decodeToken: jest.fn(),
}));

jest.mock("../../components/navbar/navbar");
jest.mock("../../components/footer/footer");

describe("HomePage Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders HomePage correctly", () => {
    render(
        <HomePage />
    );

    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Find the right dress for you")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  test("redirects to login if no token is found", () => {
    render(

        <HomePage />
    );

    expect(localStorage.getItem("token")).toBeNull();
  });

  test("renders Header if user is found", () => {
    const mockUser = { id: 1, first_name: "John", password: "secret" };
    (decodeToken as jest.Mock).mockReturnValue([{ data: [mockUser] }]);
    localStorage.setItem("token", "mockToken");

    render(
        <HomePage />
    );

    expect(screen.getByText("Mock Header")).toBeInTheDocument();
  });

  test("navigates to /product when clicking Product button", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
        <HomePage />
    );

    const productButton = screen.getByText("Product");
    fireEvent.click(productButton);

    expect(mockNavigate).toHaveBeenCalledWith("/product", {
      state: { user: null },
    });
  });
});

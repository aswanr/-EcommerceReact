import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { decodeToken } from "../../context/AuthContext";
import axios from "axios";
import SigOut from "../../context/SignOut";
jest.mock("../../context/AuthContext", () => ({
  decodeToken: jest.fn(),
}));
jest.mock("axios");
jest.mock("../../context/SignOut", () => jest.fn());

describe("HomePage Component", () => {
  const mockUser = {
    data: [{ id: 1, first_name: "John", password: "12345" }],
    exp: Date.now() / 1000 + 3600, 
    iat: Date.now() / 1000,
  };

  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
    (decodeToken as jest.Mock).mockReturnValue([mockUser]); 
    (axios.get as jest.Mock).mockResolvedValue({ data: { success: true } });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders the HomePage component", async () => {
    render(<HomePage />);

    expect(screen.getByText(/Shoppee/i)).toBeInTheDocument();
    expect(screen.getByText(/Shorts/i)).toBeInTheDocument();
    expect(screen.getByText(/Jackets/i)).toBeInTheDocument();
    expect(screen.getByText(/Pants/i)).toBeInTheDocument();
  });

  test("displays user name when token is decoded successfully", async () => {
    render(<HomePage />);
    
    expect(await screen.findByText(/John/i)).toBeInTheDocument(); 
  });
  

  test("displays 'Guest' when no user data is found", async () => {
    (decodeToken as jest.Mock).mockReturnValue([]);
    render(<HomePage />);

    expect(await screen.findByText(/John/i)).toBeInTheDocument();

  });

  test("calls API and verifies user", async () => {
    render(<HomePage />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/user/products", expect.any(Object));
    });
  });

  test("sign out removes token from localStorage", () => {
    render(<HomePage />);
    const signOutButton = screen.getByText(/Sign OUT/i);

    fireEvent.click(signOutButton);

    expect(SigOut).toHaveBeenCalled();
    expect(localStorage.getItem("token")).toBeNull();
  });

  test("handles missing token correctly", async () => {
    localStorage.removeItem("token");
    render(<HomePage />);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

});

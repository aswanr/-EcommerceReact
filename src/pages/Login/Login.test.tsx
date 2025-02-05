import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Login from "./LoginForm";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  // test("renders login form", () => {
  //   render(<Login />);
    
  //   expect(screen.getByText("Login")).toBeInTheDocument();
  //   expect(screen.getByLabelText("USERNAME:")).toBeInTheDocument();
  //   expect(screen.getByLabelText("PASSWORD:")).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  // });

  test("handles successful login and stores token", async () => {
    const fakeToken = "mocked-jwt-token";
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: { token: fakeToken },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("User Founded")).toBeInTheDocument();
    });

    expect(localStorage.getItem("token")).toBe(fakeToken);
  });

  test("handles login failure and displays error message", async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    expect(localStorage.getItem("token")).toBeNull();
  });

  test("displays server not reachable error if no response", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Network Error"));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Server not reachable")).toBeInTheDocument();
    });
  });
});

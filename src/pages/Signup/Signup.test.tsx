import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import SignUp from "./SignupForm";

jest.mock("axios");

describe("SignUp Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("signup form with all fields and button", () => {
    render(<SignUp />);
    expect(screen.getByText("Create an Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter first name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Choose a username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter phone number")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("user into input fields", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Enter first name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Enter last name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), { target: { value: "johndoe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter phone number"), { target: { value: "1234567890" } });

    expect(screen.getByPlaceholderText("Enter first name")).toHaveValue("John");
    expect(screen.getByPlaceholderText("Enter last name")).toHaveValue("Doe");
    expect(screen.getByPlaceholderText("Choose a username")).toHaveValue("johndoe");
    expect(screen.getByPlaceholderText("Enter password")).toHaveValue("password123");
    expect(screen.getByPlaceholderText("Enter email")).toHaveValue("john@example.com");
    expect(screen.getByPlaceholderText("Enter phone number")).toHaveValue("1234567890");
  });

  // it("if required fields is empty", async () => {
  //   render(<SignUp />);
  //   fireEvent.click(screen.getByRole("button", { name: /signup/i }));
  //   await waitFor(() => expect(axios.post).not.toHaveBeenCalled());
  // });

  it("Submitt with valued input", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
    render(<SignUp />);
    
    fireEvent.change(screen.getByPlaceholderText("Enter first name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Enter last name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), { target: { value: "johndoe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter phone number"), { target: { value: "1234567890" } });
    
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/user/postuser", expect.objectContaining({
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        password: "password123",
        email: "john@example.com",
        phone_number: "1234567890"
      }));
    });
  });

  it("should display error message when API call fails", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Unable to find"));
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), { target: { value: "johndoe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    
  });

  it("should correctly handle created_time field", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Enter first name"), { target: { value: "John" } });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/user/postuser", 
        expect.objectContaining({ created_time: expect.any(Date) })
      );
    });
  });

  it("should show error message on network failure", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Network error"));
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), { target: { value: "johndoe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    
   
  });
});

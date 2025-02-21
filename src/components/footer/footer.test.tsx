import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";
import "@testing-library/jest-dom"; 

describe("Footer Component", () => {
  test("Gettign footer", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("views footer sections", () => {
    render(<Footer />);
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("Social")).toBeInTheDocument();
  });

  test("checking links", () => {
    render(<Footer />);
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
    expect(screen.getByText("Tumblr")).toBeInTheDocument();
    expect(screen.getByText("Pinterest")).toBeInTheDocument();
  });


});

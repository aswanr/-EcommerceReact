import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Carts from "./product";

jest.mock("axios");

describe("Carts Component", () => {
  const mockProducts = [
    {
      id: 1,
      category_id: 2,
      name: "Test Product",
      price: 99.99,
      description: "A sample product",
      created_time: "2024-02-11",
    },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { data: [mockProducts] },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays product details", async () => {
    render(<Carts />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
  });

  it("displays the BUY button", async () => {
    render(<Carts />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /buy/i })).toBeInTheDocument();
    });
  });

  it("triggers navigation when BUY button is clicked", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(<Carts />);

    const buyButton = await screen.findByRole("button", { name: /buy/i });
    await userEvent.click(buyButton);

    expect(mockNavigate).toHaveBeenCalledWith("/product/1");
  });
});

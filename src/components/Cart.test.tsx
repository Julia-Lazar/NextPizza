import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Cart } from "./Cart";
import * as CartContext from "../context/CartContext";

let mockUseCartReturn: any;

vi.mock("../context/CartContext", () => ({
  useCart: () => mockUseCartReturn,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Cart component", () => {
  beforeEach(() => {
    mockUseCartReturn = {
      cart: [
        {
          id: 1,
          name: "Margherita",
          sizeName: "Medium",
          price: 20,
          quantity: 2,
          imageUrl: "/pizza.jpg",
        },
      ],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getTotalPrice: () => 40,
      getTotalItems: () => 2,
      clearCart: vi.fn(),
      isCartOpen: false,
      setIsCartOpen: vi.fn(),
    };
  });

  it("renders floating cart button on main page", () => {
    render(<Cart />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("🛒")).toBeInTheDocument();
  });

  it("shows total items badge if cart has items", () => {
    render(<Cart />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not show sidebar when isCartOpen is false", () => {
    render(<Cart />);
    expect(screen.queryByText("Your Cart")).not.toBeInTheDocument();
  });

  it("shows sidebar when isCartOpen is true", () => {
    mockUseCartReturn = {
      ...mockUseCartReturn,
      isCartOpen: true,
    };
    render(<Cart />);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Margherita")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getAllByText("40 zł").length).toBeGreaterThan(0);
    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
  });

  it("shows empty message if cart is empty", () => {
    mockUseCartReturn = {
      ...mockUseCartReturn,
      cart: [],
      isCartOpen: true,
      getTotalPrice: () => 0,
      getTotalItems: () => 0,
    };
    render(<Cart />);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});

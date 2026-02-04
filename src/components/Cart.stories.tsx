import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Cart } from "./Cart";
import { CartProvider, useCart } from "../context/CartContext";
import React from "react";

const meta = {
  title: "Components/Cart",
  component: Cart,
  decorators: [
    (Story) => (
      <CartProvider>
        <Story />
      </CartProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Cart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const CartWithItemsWrapper = () => {
  const { addToCart, setIsCartOpen } = useCart();

  React.useEffect(() => {
    // Add items to cart
    addToCart({
      name: "Margherita Pizza",
      size: 30,
      price: 20,
      image: "/images/margherita.jpg",
    });
    addToCart({
      name: "Pepperoni Pizza",
      size: 40,
      price: 25,
      image: "/images/pepperoni.jpg",
    });
    addToCart({
      name: "Hawaiian Pizza",
      size: 30,
      price: 26,
      image: "/images/hawaii.jpg",
    });
    // Open cart automatically
    setTimeout(() => {
      setIsCartOpen(true);
    }, 100);
  }, []);

  return <Cart />;
};

export const WithItems: Story = {
  render: () => <CartWithItemsWrapper />,
};

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
      id: "story-item-1",
      name: "Margherita Pizza",
      sizeName: "30 cm",
      price: 20,
      imageUrl: "/images/margherita.jpg",
    });
    addToCart({
      id: "story-item-2",
      name: "Pepperoni Pizza",
      sizeName: "40 cm",
      price: 25,
      imageUrl: "/images/pepperoni.jpg",
    });
    addToCart({
      id: "story-item-3",
      name: "Hawaiian Pizza",
      sizeName: "30 cm",
      price: 26,
      imageUrl: "/images/hawaii.jpg",
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

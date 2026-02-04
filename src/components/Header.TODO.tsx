// import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// import { Header } from "./Header";
// import { CartProvider } from "../context/CartContext";
// import { SessionProvider } from "next-auth/react";
// // Removed PrismaClient import and instantiation as it's not needed for Storybook

// const meta = {
//   title: "Components/Header",
//   component: Header,
//   parameters: {
//     layout: "fullscreen",
//   },
//   tags: ["autodocs"],
//   decorators: [
//     (Story) => (
//       <CartProvider>
//         <SessionProvider
//           session={{
//             user: {
//               name: "John Doe",
//               email: "john.doe@example.com",
//               image: "https://example.com/avatar.jpg",
//             },
//             expires: "9999-12-31T23:59:59.999Z",
//           }}
//         >
//           <Story />
//         </SessionProvider>
//       </CartProvider>
//     ),
//   ],
// } satisfies Meta<typeof Header>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Default: Story = {};

import { render, screen } from "@testing-library/react";
import { CardTile } from "./CardTile";
import { CartProvider } from "../context/CartContext";
import userEvent from "@testing-library/user-event";

describe("CardTile Component", () => {
  it("renders the component with required props", () => {
    render(
      <CartProvider>
        <CardTile name="Test Product" imageUrl="/test-image.jpg" />
      </CartProvider>
    );
    const nameElement = screen.getByText("Test Product");
    expect(nameElement).toBeInTheDocument();
  });

  // todo: solve images with the same text
  it("displays fallback image on invalid image URL", () => {
    render(
      <CartProvider>
        <CardTile name="Test Product" imageUrl="invalid-url" />
      </CartProvider>
    );
    const imgElement = screen.getByAltText("Test Product") as HTMLImageElement;
    expect(
      imgElement.src.endsWith("/images/fallback.png") ||
        (imgElement.src.includes("/_next/image") &&
          imgElement.src.includes("%2Fimages%2Ffallback.png")) // because of Next.js image optimization
      // appears because Next.js automatically optimizes images when you use the <Image /> component from next/image.
      // Instead of serving the image directly from /images/fallback.png, Next.js routes the request through its own image optimization server (/_next/image?...). This allows images to be automatically resized, compressed, and cached.
    ).toBe(true);
  });

  // test for checking if the number of rendered buttons matches the number of sizes provided
  it("renders size options when sizes prop is provided", () => {
    const sizes = [
      { sizeName: "Small", price: 5 },
      { sizeName: "Medium", price: 7 },
      { sizeName: "Large", price: 9 },
    ];

    render(
      <CartProvider>
        <CardTile
          name="Test Product"
          imageUrl="/test-image.jpg"
          sizes={sizes}
        />
      </CartProvider>
    );

    // Find each button by its accessible name (the sizeName)
    sizes.forEach((size) => {
      expect(
        screen.getByRole("button", { name: size.sizeName })
      ).toBeInTheDocument();
    });

    // Optionally, check the total number of size buttons
    const allButtons = screen.getAllByRole("button", {
      name: /Small|Medium|Large/,
    });
    expect(allButtons.length).toBe(sizes.length);
  });

  it("display size name in button text", () => {
    const sizes = [
      { sizeName: "250ml", price: 6 },
      { sizeName: "500ml", price: 8 },
      { sizeName: "1L", price: 15 },
    ];
    render(
      <CartProvider>
        <CardTile
          name="Test Product"
          imageUrl="/test-image.jpg"
          sizes={sizes}
        />
      </CartProvider>
    );

    // Check if each size name is in the button name prop
    sizes.forEach((size) => {
      expect(
        screen.getByRole("button", { name: size.sizeName })
      ).toBeInTheDocument();
    });
    // Additionally, check if size names are displayed in the button text
    sizes.forEach((size) => {
      expect(screen.getByText(size.sizeName)).toBeInTheDocument();
    });
  });

  it("Display the price of the product in the selected size.", async () => {
    const sizes = [
      { sizeName: "250ml", price: 6 },
      { sizeName: "500ml", price: 8 },
      { sizeName: "1L", price: 15 },
    ];
    render(
      <CartProvider>
        <CardTile
          name="Test Product"
          imageUrl="/test-image.jpg"
          sizes={sizes}
        />
      </CartProvider>
    );

    // Helper function to check which price is visible
    function expectOnlyPriceVisible(visiblePrice: string, allPrices: string[]) {
      allPrices.forEach((price) => {
        if (price === visiblePrice) {
          expect(screen.getByText(price)).toBeInTheDocument();
        } else {
          expect(screen.queryByText(price)).not.toBeInTheDocument();
        }
      });
    }
    const prices = sizes.map((s) => `${s.price} zł`);

    // Check if the price is set to the first size's price by default
    expectOnlyPriceVisible("6 zł", prices);
    // Simulate clicking on the second size button
    const secondSizeButton = screen.getByRole("button", { name: "500ml" });
    const user = userEvent.setup();
    await user.click(secondSizeButton);

    // Check if the price updates to the second size's price
    expectOnlyPriceVisible("8 zł", prices);

    const thirdSizeButton = screen.getByRole("button", { name: "1L" });
    await user.click(thirdSizeButton);
    // Check if the price updates to the third size's price
    expectOnlyPriceVisible("15 zł", prices);
  });
});

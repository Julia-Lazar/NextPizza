import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuManager from "./MenuManager";

// Zakładamy, że msw lub inne mocki API są ustawione globalnie

describe("MenuManager - ingredient integration", () => {
  it("adds a new ingredient and shows success message", async () => {
    render(<MenuManager />);
    // Przełącz na zakładkę składników
    const ingredientTab = screen.getByRole("button", { name: /ingredient/i });
    await userEvent.click(ingredientTab);

    const input = screen.getByPlaceholderText(/ingredient name/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Basil");
    await userEvent.click(addButton);

    expect(await screen.findByText(/ingredient added/i)).toBeInTheDocument();
    expect(input).toHaveValue("");
    // Sprawdź, czy składnik pojawił się na liście (jeśli jest renderowany)
    expect(screen.getByText(/basil/i)).toBeInTheDocument();
  });

  it("shows error when adding duplicate ingredient", async () => {
    render(<MenuManager />);
    const ingredientTab = screen.getByRole("button", { name: /ingredient/i });
    await userEvent.click(ingredientTab);

    const input = screen.getByPlaceholderText(/ingredient name/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Tomato");
    await userEvent.click(addButton);

    await userEvent.type(input, "Tomato");
    await userEvent.click(addButton);

    expect(
      await screen.findByText(/ingredient already exists in database/i)
    ).toBeInTheDocument();
  });

  it("shows error when input is empty", async () => {
    render(<MenuManager />);
    const ingredientTab = screen.getByRole("button", { name: /ingredient/i });
    await userEvent.click(ingredientTab);

    const addButton = screen.getByRole("button", { name: /add/i });
    await userEvent.click(addButton);

    // Sprawdź, czy nie pojawia się komunikat sukcesu
    expect(screen.queryByText(/ingredient added/i)).toBeNull();
  });

  it("deletes an ingredient and shows message", async () => {
    render(<MenuManager />);
    const ingredientTab = screen.getByRole("button", { name: /ingredient/i });
    await userEvent.click(ingredientTab);

    const input = screen.getByPlaceholderText(/ingredient name/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Onion");
    await userEvent.click(addButton);

    // Poczekaj aż składnik się pojawi
    const ingredient = await screen.findByText(/onion/i);

    // Kliknij przycisk usuwania (przykład, zależnie od implementacji)
    const deleteButton = screen.getByRole("button", { name: /delete onion/i });
    await userEvent.click(deleteButton);

    expect(await screen.findByText(/Ingredient deleted/i)).toBeInTheDocument();
    // Sprawdź, że składnik zniknął z listy

    expect(screen.queryByText(/onion/i)).toBeNull();
  });
});

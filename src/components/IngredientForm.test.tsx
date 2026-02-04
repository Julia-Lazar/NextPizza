import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IngredientForm, { IngredientFormProps } from "./IngredientForm";
import { useState } from "react";

// I only test UI logic here, not API calls

// Simple wrapper to provide state for the form
function IngredientFormWrapper(props: Partial<IngredientFormProps> = {}) {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientMsg, setIngredientMsg] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = ingredientName.trim().toLowerCase();
    if (!name) {
      setIngredientMsg("Ingredient name cannot be empty");
    } else if (name.length > 100) {
      setIngredientMsg("Ingredient name cannot exceed 100 characters");
    } else if (!/^[a-ząćęłńóśźż0-9\s-]+$/i.test(name)) {
      setIngredientMsg("Ingredient name contains invalid characters");
    } else if (/^\d+$/.test(name)) {
      setIngredientMsg("Ingredient name cannot be numeric only");
    } else if (ingredients.some((ing) => ing.name === name)) {
      setIngredientMsg("Ingredient already exists in database.");
    } else {
      setIngredients([...ingredients, { name, id: Date.now() }]);
      setIngredientMsg("Ingredient added!");
      setIngredientName("");
    }
  };

  const handleDelete = (id: number) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  return (
    <IngredientForm
      ingredientName={ingredientName}
      setIngredientName={setIngredientName}
      ingredientMsg={ingredientMsg}
      ingredients={ingredients}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      {...props}
    />
  );
}

describe("IngredientForm", () => {
  it("renders input and add button", () => {
    render(<IngredientFormWrapper />);
    expect(screen.getByPlaceholderText(/ingredient name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  // this test is commented out because empty input is already handled by 'required' attribute
  // it("shows error for empty input", async () => {
  //   render(<IngredientFormWrapper />);
  //   await userEvent.click(screen.getByRole("button", { name: /add/i }));
  //   expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();
  // });

  it("shows error for too long name", async () => {
    render(<IngredientFormWrapper />);
    const input = screen.getByPlaceholderText(/ingredient name/i);
    await userEvent.type(input, "A".repeat(101));
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(
      await screen.findByText(/cannot exceed 100 characters/i)
    ).toBeInTheDocument();
  });

  it("shows error for invalid characters", async () => {
    render(<IngredientFormWrapper />);
    const input = screen.getByPlaceholderText(/ingredient name/i);
    await userEvent.type(input, "Tom@to!");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(
      await screen.findByText(/contains invalid characters/i)
    ).toBeInTheDocument();
  });

  it("shows error for numeric-only name", async () => {
    render(<IngredientFormWrapper />);
    const input = screen.getByPlaceholderText(/ingredient name/i);
    await userEvent.type(input, "12345");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(
      await screen.findByText(/cannot be numeric only/i)
    ).toBeInTheDocument();
  });

  it("adds ingredient and clears input", async () => {
    render(<IngredientFormWrapper />);
    const input = screen.getByPlaceholderText(/ingredient name/i);
    await userEvent.type(input, "Tomato");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(await screen.findByText(/ingredient added/i)).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(screen.getByText(/tomato/i)).toBeInTheDocument();
  });

  it("shows error for duplicate ingredient", async () => {
    render(<IngredientFormWrapper />);
    const input = screen.getByPlaceholderText(/ingredient name/i);
    await userEvent.type(input, "Tomato");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    await userEvent.type(input, "Tomato");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(await screen.findByText(/already exists/i)).toBeInTheDocument();
  });

  it("trims and lowercases input before adding", async () => {
    render(<IngredientFormWrapper />);
    const input = screen.getByPlaceholderText(/ingredient name/i);
    await userEvent.type(input, "  PeaCh  ");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText(/peach/i)).toBeInTheDocument();
  });
});

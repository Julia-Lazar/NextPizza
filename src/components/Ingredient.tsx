interface IngredientProps {
  ingredient: {
    id: number;
    name: string;
  };
  onDelete: (id: number) => void;
}

const Ingredient = ({ ingredient, onDelete }: IngredientProps) => {
  return (
    <span
      key={ingredient.id}
      className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-900 flex items-center gap-2"
    >
      {ingredient.name}
      <button
        type="button"
        aria-label={`delete ${ingredient.name}`}
        className="ml-2 text-red-600 hover:text-red-800 font-bold px-2 py-0.5 rounded-full focus:outline-none"
        title="Delete ingredient"
        onClick={() => onDelete(ingredient.id)}
        style={{ cursor: "pointer" }}
      >
        ×
      </button>
    </span>
  );
};

export default Ingredient;

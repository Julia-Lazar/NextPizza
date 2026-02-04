'use client';
import React, { useState } from 'react';
import Ingredient from './Ingredient';

export interface IngredientFormProps {
  onSubmit: (e: React.FormEvent) => void;
  ingredientName: string;
  setIngredientName: React.Dispatch<React.SetStateAction<string>>;
  ingredientMsg: string | null;
  ingredients: any[];
  onDelete: (id: number) => void;
}

export default function IngredientForm({
  onSubmit,
  ingredientName,
  setIngredientName,
  ingredientMsg,
  ingredients,
  onDelete,
}: IngredientFormProps) {
  return (
    <>
      <form onSubmit={onSubmit} className="mb-4 flex gap-2 items-end">
        <div>
          <label
            htmlFor="ingredientName"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Add Ingredient
          </label>
          <input
            id="ingredientName"
            type="text"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
            placeholder="Ingredient name"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Add
        </button>
        {ingredientMsg && (
          <span
            aria-label="ingredient message"
            className="ml-4 text-sm font-semibold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300"
          >
            {ingredientMsg}
          </span>
        )}
      </form>
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          All Ingredients
        </label>
        <div className="flex flex-wrap gap-2">
          {ingredients.length === 0 ? (
            <span className="text-gray-500">No ingredients found.</span>
          ) : (
            ingredients.length > 0 &&
            ingredients.map((ing) => (
              <Ingredient key={ing.id} ingredient={ing} onDelete={onDelete} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

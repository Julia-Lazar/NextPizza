'use client';
import React, { useState, useEffect } from 'react';
import ImageUploaderLocal from '@/components/ImageUploaderLocal';

interface MenuItemSize {
  sizeName: string;
  price: number;
}

interface Ingredient {
  id: string;
  name: string;
}

export default function MenuItemForm({ item, onSave, onCancel }: any) {
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [formData, setFormData] = useState({
    name: item?.name || '',
    imageUrl: item?.imageUrl || '',
    ingredients: item?.ingredients || [],
    category: item?.category?.toUpperCase?.() || 'PIZZA',
    sizes: item?.sizes || [{ sizeName: '', price: 0 }],
  });

  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch('/api/ingredients')
      .then((res) => res.json())
      .then((data) => setAllIngredients(data))
      .catch(() => setAllIngredients([]));
  }, []);

  // When editing, set selected ingredients from item (if present)
  useEffect(() => {
    if (item) {
      // Load ingredients from ProductIngredient relation or fallback to ingredients array
      let loadedIngredients = [];
      if (item.productIngredient) {
        loadedIngredients = item.productIngredient.map(
          (pi: any) => pi.ingredient.name,
        );
      } else if (item.ingredients) {
        loadedIngredients = item.ingredients;
      }

      // Load sizes and prices from ProductSize relation or fallback to sizes array
      let loadedSizes = [];
      if (item.productSize) {
        loadedSizes = item.productSize.map((ps: any) => ({
          sizeName: ps.sizeName,
          price: ps.price ?? 0,
        }));
      } else if (item.sizes) {
        loadedSizes = item.sizes;
      }

      setFormData((prev) => ({
        ...prev,
        ingredients: loadedIngredients,
        sizes: loadedSizes,
      }));
    }
  }, [item]);

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredient)
        ? prev.ingredients.filter((i: string) => i !== ingredient)
        : [...prev.ingredients, ingredient],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    const { name, imageUrl, ingredients, category, sizes } = formData;
    // Ensure sizes are sent as array of { size, price }
    //

    onSave({
      name,
      imageUrl,
      ingredients,
      category,
      sizes: sizes,
    });
  };

  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { sizeName: '', price: 0 }],
    }));
  };

  const removeSize = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_: any, i: number) => i !== index),
    }));
  };

  // Update sizeName or price for a size entry
  const updateSize = (
    index: number,
    field: 'sizeName' | 'price',
    value: string | number,
  ) => {
    setFormData((prev) => {
      const newSizes = [...prev.sizes];
      newSizes[index] = {
        ...newSizes[index],
        [field]: field === 'price' ? Number(value) : value,
      };
      return { ...prev, sizes: newSizes };
    });
  };

  // Filtered ingredients for search
  const filteredIngredients = ingredientSearch.trim()
    ? allIngredients.filter((ingredient) =>
        ingredient.name
          .toLowerCase()
          .includes(ingredientSearch.trim().toLowerCase()),
      )
    : allIngredients;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-full break-words"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Image URL
        </label>
        {/* <input
          type="text"
          required
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        /> */}
        <ImageUploaderLocal
          onUploaded={(url) => {
            console.log('Saved at', url);
            setFormData((prev) => ({ ...prev, imageUrl: url }));
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        >
          <option value="PIZZA">Pizza</option>
          <option value="SAUCE">Sauces</option>
          <option value="DRINK">Drinks</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ingredients
        </label>
        <input
          type="text"
          placeholder="Search ingredients..."
          value={ingredientSearch}
          onChange={(e) => setIngredientSearch(e.target.value)}
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        />
        <div className="flex flex-wrap gap-2">
          {filteredIngredients.map((ingredient: Ingredient) => (
            <span
              key={ingredient.id}
              onClick={() => toggleIngredient(ingredient.name)}
              className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${
                formData.ingredients.includes(ingredient.name)
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-orange-100'
              }`}
              style={{ cursor: 'pointer' }}
            >
              {ingredient.name}
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sizes & Prices
        </label>
        {/* Size/Price inputs in their own rows, wrapped if overflow */}
        <div className="flex flex-col gap-2 max-h-64 overflow-auto pr-2">
          {formData.sizes.map((size: MenuItemSize, index: number) => (
            <div
              key={index}
              className="flex flex-row gap-2 mb-2 items-center min-w-0"
            >
              <input
                type="text"
                placeholder="Size"
                required
                value={size.sizeName}
                onChange={(e) => updateSize(index, 'sizeName', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 min-w-0"
              />
              <input
                type="number"
                placeholder="Price"
                required
                value={Number(size.price)}
                onChange={(e) => updateSize(index, 'price', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 min-w-0"
              />
              {formData.sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  style={{ cursor: 'pointer' }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {/* Add Size button in a separate row below */}
        <div className="mt-2">
          <button
            type="button"
            onClick={addSize}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            style={{ cursor: 'pointer' }}
          >
            Add Size
          </button>
        </div>
        {/* Saved sizes as tiles */}
        {formData.sizes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.sizes.map(
              (
                size: {
                  sizeName: string;
                  price: number;
                },
                idx: React.Key | null | undefined,
              ) =>
                size.sizeName && (
                  <div
                    key={idx}
                    className="bg-orange-100 border border-orange-400 rounded-lg px-3 py-1 text-orange-800 text-sm flex items-center gap-2"
                  >
                    <span>{size.sizeName}</span>
                    <span className="font-semibold">
                      {Number(size.price).toFixed(2)} zł
                    </span>
                  </div>
                ),
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-16 w-full">
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition w-full sm:w-auto"
          style={{ cursor: 'pointer' }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition w-full sm:w-auto"
          style={{ cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

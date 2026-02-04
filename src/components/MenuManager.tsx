'use client';
import { useState, useEffect, Key } from 'react';
import { useMenu } from '../context/MenuContext';
import MenuItemForm from './MenuItemForm';
import MenuItemCard from './MenuItemCard';
import IngredientForm from './IngredientForm';
import { error } from 'console';

export default function MenuManager({}: any) {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState<
    'PIZZA' | 'SAUCE' | 'DRINK' | 'INGREDIENT'
  >('PIZZA');

  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const closeSnackbar = () => setSnackbar(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setIsLoading(false);
      })
      .catch(() => {
        setMenuItems([]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => setSnackbar(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const filteredItems = menuItems.filter
    ? menuItems.filter((item) => item.category === categoryFilter)
    : [];

  const handleSave = async (formData: any) => {
    try {
      let response;
      if (editingItem?.id) {
        response = await fetch(`/api/products/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        console.log('POSTING');
        console.log(formData);
        console.log(JSON.stringify(formData));
        response = await fetch(`/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          setSnackbar({
            message:
              'Validation error: ' +
              (errorData.error?.[0]?.message || 'Invalid data'),
            type: 'error',
          });
        } else {
          setSnackbar({ message: 'Error saving item', type: 'error' });
        }
        setIsEditing(true);
        // setEditingItem(null);
        return;
      }

      const updated = await fetch('/api/products').then((r) => r.json());

      setMenuItems(updated);
      setSnackbar({ message: 'Product saved successfully!', type: 'success' });
    } catch (error) {
      alert('Error saving item');
      console.log(error);
      setSnackbar({ message: 'Error saving item', type: 'error' });
      setIsEditing(true);
      // setEditingItem(null);
    }
    setIsEditing(false);
    setEditingItem(null); // co tutaj dać?
  };

  // Ingredient api reqests
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientMsg, setIngredientMsg] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/ingredients')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setIngredients(data);
      })
      .catch(() => {
        setIngredients([]);
        setIngredientMsg('Error fetching ingredients');
      });
  }, []);

  const handleIngredientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = ingredientName.trim();
    if (!name) return;
    const exists = ingredients.some(
      (ing) => ing.name.toLowerCase() === name.toLowerCase(),
    );
    if (exists) {
      setIngredientMsg('Ingredient already exists in database.');
      setTimeout(() => setIngredientMsg(null), 3000);
      return;
    }
    try {
      const res = await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        let msg = 'Error adding ingredient';
        try {
          const data = await res.json();
          if (data?.error && /unique|exists|duplicate/i.test(data.error)) {
            msg = 'Ingredient already in database';
          }
        } catch {}
        setIngredientMsg(msg);
        setTimeout(() => setIngredientMsg(null), 2000);
        return;
      }
      setIngredientMsg('Ingredient added!');
      setIngredientName('');
      const updated = await fetch('/api/ingredients').then((r) => r.json());
      setIngredients(updated);
    } catch (err) {
      setIngredientMsg('Error adding ingredient');
    }
    setTimeout(() => setIngredientMsg(null), 2000);
  };

  // Handler to delete an ingredient
  const handleDeleteIngredient = async (id: any) => {
    try {
      console.log('Deleting ingredient with id:', id);
      // Use fetch with DELETE method to /api/ingredients, passing id as query param
      const res = await fetch(`/api/ingredients/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        setIngredientMsg('Error deleting ingredient');
        setTimeout(() => setIngredientMsg(null), 2000);
        return;
      }
      // Refresh the ingredients list from the API
      const updated = await fetch('/api/ingredients').then((r) => r.json());
      setIngredients(updated);
      setIngredientMsg('Ingredient deleted');
      setTimeout(() => setIngredientMsg(null), 2000);
    } catch {
      setIngredientMsg('Error deleting ingredient');
      setTimeout(() => setIngredientMsg(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        {categoryFilter !== 'INGREDIENT' ? (
          isEditing ? (
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingItem(null);
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              style={{ minWidth: 140, minHeight: 44 }}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditing(true);
                setEditingItem(null);
              }}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
              style={{ minWidth: 140, minHeight: 44 }}
            >
              Add New Item
            </button>
          )
        ) : (
          <div style={{ minWidth: 140, minHeight: 44 }}></div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {['PIZZA', 'SAUCE', 'DRINK', 'INGREDIENT'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              categoryFilter === cat
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {categoryFilter === 'INGREDIENT' && (
        <IngredientForm
          onSubmit={handleIngredientSubmit}
          onDelete={handleDeleteIngredient}
          ingredientName={ingredientName}
          setIngredientName={setIngredientName}
          ingredientMsg={ingredientMsg}
          ingredients={ingredients}
        />
      )}
      {isLoading && (
        <div>
          <div className="rounded-xl p-3 sm:p-5 shadow-lg bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400 animate-pulse mb-6">
            <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg shadow-md bg-gray-200 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          </div>
          <div className="rounded-xl p-3 sm:p-5 shadow-lg bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400 animate-pulse mb-6">
            <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg shadow-md bg-gray-200 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          </div>
          <div className="rounded-xl p-3 sm:p-5 shadow-lg bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400 animate-pulse mb-6">
            <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg shadow-md bg-gray-200 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          </div>
        </div>
      )}
      {categoryFilter !== 'INGREDIENT' &&
        (isEditing ? (
          <MenuItemForm
            item={editingItem}
            onSave={handleSave}
            onCancel={() => {
              setIsEditing(false);
              setEditingItem(null);
            }}
          />
        ) : (
          <div className="grid gap-4">
            {filteredItems &&
              filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  setEditingItem={setEditingItem}
                  setIsEditing={setIsEditing}
                  setMenuItems={setMenuItems}
                />
              ))}
          </div>
        ))}
      {snackbar && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white transition
      ${snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          style={{
            zIndex: 1000,
            minWidth: 220,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span className="flex-1">{snackbar.message}</span>
          <button
            onClick={closeSnackbar}
            className="ml-4 px-2 py-1 text-orange-900 font-bold"
            aria-label="Close"
            style={{ fontSize: 18, lineHeight: 1, cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

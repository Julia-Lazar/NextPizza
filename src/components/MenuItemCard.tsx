import React from 'react';
import Image from 'next/image';
import { isValidImageSrc } from '@/lib/utils';

export default function MenuItemCard({
  item,
  setEditingItem,
  setIsEditing,
  setMenuItems,
}: any) {
  // Ensure imageUrl is a valid string for next/image
  const validInitialSrc = isValidImageSrc(item.imageUrl);
  const [imgSrc, setImgSrc] = React.useState(
    validInitialSrc ? item.imageUrl : '/images/fallback.png',
  );

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1 flex flex-col sm:flex-row gap-4 min-h-[60px]">
          <div className="flex-shrink-0 flex items-center justify-center mb-2 sm:mb-0 w-full sm:w-auto">
            <Image
              src={imgSrc}
              alt={item.name}
              className="object-cover rounded-lg border border-gray-200 w-full sm:w-[140px]"
              style={{
                aspectRatio: '1 / 1',
                width: '140px',
                height: '140px',
              }}
              width={140}
              height={140}
              priority={false}
              objectFit="cover"
              onError={() => setImgSrc('/images/fallback.png')}
            />
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-900 mb-2">
              Category: {item.category}
            </p>
            <p className="text-sm text-gray-900 mb-2">
              Ingredients:{' '}
              {item.productIngredient
                .map((ing: any) => ing.ingredient.name)
                .join(', ')}
            </p>
            <div className="flex gap-2 flex-wrap mb-2">
              {item.productSize.map((size: any, idx: number) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-900"
                >
                  {size.size?.size ?? size.sizeName}:{' '}
                  {size.price ?? size.size?.price ?? ''} zł
                </span>
              ))}
            </div>
            {/* Buttons below Ingredients on mobile only */}
            <div className="flex gap-2 flex-wrap mt-2 sm:hidden">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setIsEditing(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                style={{ cursor: 'pointer' }}
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (
                    confirm(
                      `Are you sure you want to delete this item? ID:${item.id}`,
                    )
                  ) {
                    await fetch(`/api/products/${item.id}`, {
                      method: 'DELETE',
                    });
                    const updated = await fetch('/api/products').then((r) =>
                      r.json(),
                    );
                    setMenuItems(updated);
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                style={{ cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {/* Buttons to the right on desktop only */}
        <div className="hidden sm:flex gap-2 flex-wrap w-full sm:w-auto sm:mt-0 mt-2 justify-end">
          <button
            onClick={() => {
              setEditingItem(item);
              setIsEditing(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
            style={{ cursor: 'pointer' }}
          >
            Edit
          </button>
          <button
            onClick={async () => {
              if (
                confirm(
                  `Are you sure you want to delete this item? ID: ${item.id}`,
                )
              ) {
                await fetch(`/api/products/${item.id}`, {
                  method: 'DELETE',
                });
                const updated = await fetch('/api/products').then((r) =>
                  r.json(),
                );
                setMenuItems(updated);
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition w-full sm:w-auto"
            style={{ cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

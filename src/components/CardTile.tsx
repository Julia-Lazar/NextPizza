'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';
import { isValidImageSrc } from '@/lib/utils';

interface CardTileInterface {
  id: string;
  name: string;
  imageUrl: string;
  ingredients?: { ingredient: { name: string } }[];
  sizes?: {
    sizeName: string;
    price: number;
  }[];
}

// Fallback logic for image: only allow valid URLs or absolute paths
const fallbackImage = '/images/fallback.png';

export const CardTile: React.FC<CardTileInterface> = (props) => {
  const { id, name, imageUrl, ingredients, sizes } = props;
  // const validInitialSrc = isValidImageSrc(imageUrl) ? imageUrl : fallbackImage;
  const validInitialSrc =
    imageUrl?.startsWith('/uploads/') || isValidImageSrc(imageUrl)
      ? imageUrl
      : fallbackImage;

  const [imgSrc, setImgSrc] = React.useState(validInitialSrc);
  const { addToCart, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const hideAddToCart = pathname === '/address' || pathname === '/checkout';

  const hasSizes = Array.isArray(sizes) && sizes.length > 0;
  // If sizes exist, use first size as default, else use product price and default size label
  const [selectedSize, setSelectedSize] = React.useState(
    Array.isArray(sizes) && sizes.length > 0 ? sizes[0] : null,
  );
  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: id,
      name: name,
      sizeName: selectedSize.sizeName,
      price: selectedSize.price,
      imageUrl: imageUrl,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="rounded-xl p-3 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row gap-3 sm:gap-5 bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400">
      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg shadow-md">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover rounded-lg"
          onError={() => setImgSrc('/images/fallback.png')}
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-orange-700">
            {name}
          </h3>
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-800">
              Ingredients:
            </label>
            <p className="text-gray-600 text-xs sm:text-sm">
              {ingredients && ingredients.length > 0
                ? ingredients.map((ing) => ing.ingredient.name).join(', ')
                : 'No ingredients'}
            </p>
          </div>
        </div>

        <div>
          {hasSizes && (
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sizeOption, i) => (
                  <button
                    key={i}
                    name={sizeOption.sizeName}
                    onClick={() => setSelectedSize(sizeOption)}
                    className={`px-2 py-0.5 rounded border text-sm ${
                      selectedSize &&
                      selectedSize.sizeName === sizeOption.sizeName
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    {sizeOption.sizeName}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <span className="text-xl sm:text-2xl font-bold text-orange-600">
              {selectedSize ? `${selectedSize.price} zł` : ''}
            </span>
            {!hideAddToCart && (
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-3 sm:py-1.5 text-sm rounded-md transition-colors"
                style={{ cursor: 'pointer' }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

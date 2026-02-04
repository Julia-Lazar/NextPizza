import Image from 'next/image';
import { isValidImageSrc } from '@/lib/utils';
import React from 'react';

interface CartItemProps {
  id: string;
  item: any;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  fallbackImage: string;
  imageUrl: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  imageUrl,
  removeFromCart,
  updateQuantity,
  fallbackImage,
}) => {
  const validInitialSrc = isValidImageSrc(imageUrl) ? imageUrl : fallbackImage;
  const [imgSrc, setImgSrc] = React.useState(validInitialSrc);

  return (
    <div className="border border-orange-200 rounded-lg p-4 bg-gradient-to-br from-white to-orange-50">
      <div className="flex gap-3">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={imgSrc}
            alt={item.name}
            fill
            className="object-cover"
            onError={() => setImgSrc(fallbackImage)}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-orange-700">{item.name}</h3>
          <p className="text-sm text-gray-600">Size: {item.sizeName}</p>
          <p className="text-sm font-bold text-orange-600 mt-1">
            {item.price} zł
          </p>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 font-bold text-xl"
          style={{ cursor: 'pointer' }}
        >
          ×
        </button>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 mt-3">
        <span className="text-sm font-semibold text-gray-700">Quantity:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-orange-500 hover:bg-orange-600 text-white w-7 h-7 rounded-md font-bold"
            style={{ cursor: 'pointer' }}
          >
            -
          </button>
          <span className="w-8 text-center font-semibold text-gray-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-orange-500 hover:bg-orange-600 text-white w-7 h-7 rounded-md font-bold"
            style={{ cursor: 'pointer' }}
          >
            +
          </button>
        </div>
        <span className="ml-auto font-bold text-gray-800">
          {item.price * item.quantity} zł
        </span>
      </div>
    </div>
  );
};

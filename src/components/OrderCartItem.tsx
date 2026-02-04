import Image from "next/image";
import { isValidImageSrc } from "@/lib/utils";
import React from "react";

interface OrderCartItemProps {
  item: {
    id: string | number;
    name: string;
    size: number | string;
    quantity: number;
    price: number;
    imageUrl: string;
  };

  fallbackImage?: string;
}

export function OrderCartItem({
  item,
  fallbackImage = "/images/fallback.png",
}: OrderCartItemProps) {
  const validInitialSrc = isValidImageSrc(item.imageUrl)
    ? item.imageUrl
    : fallbackImage;
  const [imgSrc, setImgSrc] = React.useState(validInitialSrc);

  return (
    <div className="flex gap-3 sm:gap-4 py-3 border-b border-orange-200 last:border-b-0">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          className="object-cover"
          onError={() => setImgSrc(fallbackImage)}
        />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-2">
        <div>
          <p className="font-bold text-orange-700 text-base sm:text-lg">
            {item.name}
          </p>
          <p className="text-sm text-gray-600">
            {item.size ? `Size: ${item.size} | ` : ""} Quantity: {item.quantity}
          </p>
        </div>
        <p className="font-bold text-orange-600 text-lg">
          {item.price * item.quantity} zł
        </p>
      </div>
    </div>
  );
}

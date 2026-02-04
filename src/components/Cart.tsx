'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { CartItem } from './CartItem';
import { usePathname } from 'next/navigation';
import { isValidImageSrc } from '@/lib/utils';

export const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const pathname = usePathname();

  // Fallback logic for image: only allow valid URLs or absolute paths
  const fallbackImage = '/images/fallback.png';
  return (
    <>
      {/* Floating Cart Button - Only show on main page */}
      {pathname === '/' && (
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 bg-orange-500 hover:bg-orange-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110"
          style={{ cursor: 'pointer' }}
        >
          <span className="text-xl sm:text-2xl">🛒</span>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-gray-200 text-3xl font-bold"
                style={{ cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p className="text-xl">Your cart is empty</p>
                  <p className="text-sm mt-2">Add some delicious items!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      item={item}
                      imageUrl={item.imageUrl}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                      fallbackImage={fallbackImage}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t-2 border-orange-200 p-4 sm:p-6 bg-gradient-to-r from-white to-orange-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg sm:text-xl font-bold text-gray-800">
                    Total:
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-orange-600">
                    {getTotalPrice()} zł
                  </span>
                </div>
                <div className="space-y-2">
                  <a
                    href="/address"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 rounded-lg font-bold text-base sm:text-lg transition-colors text-center"
                  >
                    Checkout
                  </a>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-orange-200 hover:bg-orange-300 text-orange-800 py-2 rounded-lg font-semibold transition-colors"
                    style={{ cursor: 'pointer' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

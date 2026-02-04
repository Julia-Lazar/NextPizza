'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface CartItem {
  id: string;
  name: string;
  sizeName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    // console.log("-------------");
    // console.log(savedCart);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.name === item.name && cartItem.sizeName === item.sizeName,
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      const newItem: CartItem = {
        ...item,
        id: item.id,
        // id: `${item.name}-${item.sizeName}-${Date.now()}`,
        quantity: 1,
      };

      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return Math.round(total * 100) / 100;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

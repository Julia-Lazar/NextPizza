'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface OrderItem {
  name: string;
  size?: { size: string; price: number };
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  notes?: string;
  paymentMethod: 'blik' | 'card' | 'cash';
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  getOrdersByStatus: (status: Order['status']) => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders, isHydrated]);

  const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

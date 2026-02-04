'use client';
import OrdersList from '@/components/OrdersList';
import React, { useEffect, useState } from 'react';

const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/orders')
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch orders');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched orders:', data);
        setOrders(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Unknown error');
      });
  }, []);

  if (error) {
    return <div className="text-red-600 font-bold">Error: {error}</div>;
  }
  return <OrdersList ordersFromDB={orders} />;
};

export default OrdersListPage;

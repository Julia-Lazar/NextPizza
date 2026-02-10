'use client';
import OrderCard from './OrderCard';
import { useState, useEffect } from 'react';

export default function OrdersList({ ordersFromDB }: any) {
  const [filter, setFilter] = useState<
    'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED' | 'ALL'
  >('PENDING');
  const [loading, setLoading] = useState(
    !ordersFromDB || !Array.isArray(ordersFromDB),
  );
  const [localOrders, setLocalOrders] = useState<any[]>(
    Array.isArray(ordersFromDB) ? ordersFromDB.filter(Boolean) : [],
  );

  useEffect(() => {
    if (ordersFromDB && Array.isArray(ordersFromDB)) {
      setLoading(false);
      setLocalOrders(ordersFromDB.filter(Boolean));
    }
  }, [ordersFromDB]);
  const filteredOrders =
    filter === 'ALL'
      ? localOrders?.filter(
          (o: any) => o && o.status !== 'DELIVERED' && o.status !== 'CANCELLED',
        )
      : localOrders?.filter((o: any) => o && o.status === filter);

  const updateOrderStatusRemote = async (
    orderId: number,
    newStatus: string,
  ) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.error || 'Failed to update order status');
    }

    return await response.json();
  };

  const deleteOrderRemote = async (orderId: number) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.error || 'Failed to delete order');
    }
  };

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    const updated = await updateOrderStatusRemote(orderId, newStatus);
    setLocalOrders((prev) =>
      prev.map((order) => (order.id === orderId ? updated : order)),
    );
  };

  const handleDelete = async (orderId: number) => {
    await deleteOrderRemote(orderId);
    setLocalOrders((prev) => prev.filter((order) => order.id !== orderId));
  };
  return (
    <div>
      <div className="flex flex-wrap gap-y-2 justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mr-2">Orders</h2>
        <div className="flex gap-2 flex-wrap">
          {[
            'PENDING',
            'PREPARING',
            'READY',
            'DELIVERED',
            'CANCELLED',
            'ALL',
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === status
                  ? 'bg-orange-600 text-white'
                  : status === 'ALL'
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-orange-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 animate-pulse bg-gray-100"
            >
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No orders to display</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              updateOrderStatus={handleStatusUpdate}
              deleteOrder={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

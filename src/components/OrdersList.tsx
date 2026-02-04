'use client';
import { useOrders } from '../context/OrdersContext';
import OrderCard from './OrderCard';
import { useState, useEffect } from 'react';

export default function OrdersList({ ordersFromDB }: any) {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [filter, setFilter] = useState<
    'ALL' | 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
  >('ALL');
  const [loading, setLoading] = useState(
    !ordersFromDB || !Array.isArray(ordersFromDB),
  );

  useEffect(() => {
    if (ordersFromDB && Array.isArray(ordersFromDB)) {
      setLoading(false);
    }
  }, [ordersFromDB]);
  const filteredOrders =
    filter === 'ALL'
      ? ordersFromDB?.filter(
          (o: any) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED',
        )
      : ordersFromDB?.filter((o: any) => o.status === filter);
  return (
    <div>
      <div className="flex flex-wrap gap-y-2 justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mr-2">Orders</h2>
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'PENDING', 'PREPARING', 'READY'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === status
                  ? 'bg-orange-600 text-white'
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
              updateOrderStatus={updateOrderStatus}
              deleteOrder={deleteOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { useOrders } from '../context/OrdersContext';

function getStatusColor(status: string) {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'PREPARING':
      return 'bg-blue-100 text-blue-800';
    case 'READY':
      return 'bg-green-100 text-green-800';
    case 'DELIVERED':
      return 'bg-gray-100 text-gray-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function OrderCard({ order }: any) {
  // const { updateOrderStatus, deleteOrder } = useOrders();
  // const { deleteOrder } = useOrders();
  console.log('Order in OrderCard:', order);
  async function updateOrderStatus(orderId: number, newStatus: string) {
    console.log('Updating order status:', orderId, newStatus);
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });
    console.log('Update response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    return await response.json();
  }

  async function deleteOrder(orderId: number) {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
    // Optionally, refresh the orders list or update state here
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-lg text-gray-800">
            {/* Order #{order.id.slice(-6)} */}
            Order #{order.id}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-700">Customer:</p>
          <p className="text-gray-600">{order.address?.fullName}</p>
          <p className="text-gray-600">{order.address?.phone}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Delivery:</p>
          <p className="text-gray-600">
            {order.address?.street}, {order.address?.city}{' '}
            {order.address?.postalCode}
          </p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
        <div className="space-y-1">
          {order.orderProducts?.map((item: any, idx: number) => (
            <p key={idx} className="text-sm text-gray-600">
              {item.quantity}x {item.product.name}
              {item.product.size ? ` (${item.size.size})` : ''} -{' '}
              {item.price * item.quantity} zł
            </p>
          ))}
        </div>
        <p className="font-bold text-orange-600 mt-2">
          Total: {order.totalPrice} zł
        </p>
      </div>
      {order.notes && (
        <div className="mb-3 bg-yellow-50 p-2 rounded">
          <p className="text-sm font-semibold text-gray-700">Notes:</p>
          <p className="text-sm text-gray-600">{order.notes}</p>
        </div>
      )}
      <div className="flex gap-2 flex-wrap">
        {order.status === 'PENDING' && (
          <button
            onClick={async () => updateOrderStatus(order.id, 'PREPARING')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Preparing
          </button>
        )}
        {order.status === 'PREPARING' && (
          <>
            <button
              onClick={async () => updateOrderStatus(order.id, 'PENDING')}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Back to Pending
            </button>
            <button
              onClick={async () => updateOrderStatus(order.id, 'READY')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Mark as Ready
            </button>
          </>
        )}
        {order.status === 'READY' && (
          <>
            <button
              onClick={async () => updateOrderStatus(order.id, 'PREPARING')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Back to Preparing
            </button>
            <button
              onClick={async () => {
                if (
                  confirm(
                    'Are you sure you want to mark this order as delivered?',
                  )
                ) {
                  await updateOrderStatus(order.id, 'DELIVERED');
                }
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Mark as Delivered
            </button>
          </>
        )}
        <button
          onClick={async () => {
            if (confirm('Are you sure you want to delete this order?')) {
              await deleteOrder(order.id);
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

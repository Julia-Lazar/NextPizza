import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const formatMoney = (value: number) =>
  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(value);

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PREPARING: 'bg-blue-100 text-blue-800',
  READY: 'bg-green-100 text-green-800',
  DELIVERED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-950 mb-2">Your orders</h1>
          <p className="text-gray-700 mb-6">
            Please log in to view your order history.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-orange-600 text-white px-5 py-2 font-semibold hover:bg-orange-700 transition"
          >
            Go to menu
          </Link>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true },
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-950 mb-2">Your orders</h1>
          <p className="text-gray-700">
            We could not find your account yet. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
      address: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-orange-700">Your orders</h1>
          <p className="text-gray-400">
            {user.name ? `${user.name},` : 'Here are'} your recent orders.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-orange-200 text-orange-700 px-4 py-2 font-semibold hover:bg-orange-50 transition"
        >
          Order more
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-400 border border-dashed border-gray-300 rounded-lg p-8">
          You have no orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    statusStyles[order.status] ?? 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Items
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {order.orderProducts.map((item) => (
                      <li
                        key={`${order.id}-${item.productId}-${item.size}`}
                        className="flex justify-between gap-3"
                      >
                        <span>
                          {item.quantity}x {item.product?.name}{' '}
                          <span className="text-gray-500">({item.size})</span>
                        </span>
                        <span className="text-gray-800">
                          {formatMoney(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-orange-600">
                      {formatMoney(order.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span className="capitalize">{order.paymentMethod}</span>
                  </div>
                  {order.address && (
                    <div>
                      <p className="font-semibold mb-1">Delivery</p>
                      <p>{order.address.fullName}</p>
                      <p>
                        {order.address.street}, {order.address.city}{' '}
                        {order.address.postalCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {order.notes && (
                <div className="mt-4 bg-orange-50 border border-orange-100 rounded p-3 text-sm text-gray-700">
                  <span className="font-semibold">Notes: </span>
                  {order.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

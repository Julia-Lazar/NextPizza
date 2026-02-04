'use client';
import { useState, useEffect, Key, useMemo } from 'react';

import { useMenu } from '@/context/MenuContext';
import { useOrders } from '@/context/OrdersContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface MenuItemSize {
  size: number;
  price: number;
}

export default function AdminPage({ children }: { children: React.ReactNode }) {
  const menuContext = useMenu();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo(() => {
    if (pathname.includes('/admin/menu')) {
      return 'menu';
    } else if (pathname.includes('/admin/orders')) {
      return 'orders';
    }
    return 'orders';
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Panel - Next Pizza</h1>
            <Link
              href="/"
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => {
                router.push('/admin/orders');
                // setActiveTab('orders');
              }}
              className={`flex-1 px-6 py-4 font-semibold transition rounded cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => {
                router.push('/admin/menu');
                // setActiveTab('menu');
              }}
              className={`flex-1 px-6 py-4 font-semibold transition rounded cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Menu Management
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

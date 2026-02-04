import type { Metadata } from 'next';
import { Lobster, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AddressProvider } from '@/context/AddressContext';
import { MenuProvider } from '@/context/MenuContext';
import { OrdersProvider } from '@/context/OrdersContext';
import AuthProvider from './AuthProvider';

const lobster = Lobster({
  weight: '400',
  variable: '--font-lobster',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next Pizza - Delicious Pizza Delivered',
  description:
    'Order delicious pizza online with Next Pizza. Fast delivery, fresh ingredients, and amazing taste!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lobster.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <MenuProvider>
            <OrdersProvider>
              <AddressProvider>
                <CartProvider>{children}</CartProvider>
              </AddressProvider>
            </OrdersProvider>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

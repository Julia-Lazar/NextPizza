import type { Metadata } from 'next';
import { Lobster, Poppins } from 'next/font/google';
import '@/app/globals.css';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { AddressProvider } from '@/context/AddressContext';
import { MenuProvider } from '@/context/MenuContext';
import { OrdersProvider } from '@/context/OrdersContext';
import { Cart } from '@/components/Cart';
import { auth } from '@/auth';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <MenuProvider>
      <OrdersProvider>
        <AddressProvider>
          <CartProvider>
            <Header session={session}></Header>
            <Main>{children}</Main>
            <Footer></Footer>
            <Cart />
          </CartProvider>
        </AddressProvider>
      </OrdersProvider>
    </MenuProvider>
  );
}

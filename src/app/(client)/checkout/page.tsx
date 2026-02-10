'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAddress } from '@/context/AddressContext';
import { useOrders } from '@/context/OrdersContext';
import { useState } from 'react';
import Image from 'next/image';
import { isValidImageSrc } from '@/lib/utils';
import { OrderCartItem } from '@/components/OrderCartItem';
import CheckoutWrapper from '@/components/CheckoutWrapper';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { addressData } = useAddress();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<'blik' | 'card' | 'cash'>(
    'blik',
  );

  useEffect(() => {
    if (!addressData) {
      router.push('/address');
    }
  }, [addressData, router]);

  const handleConfirmOrder = () => {
    if (!addressData || cart.length === 0) {
      return;
    }

    // const newOrder = {
    //   // userId: ... // Optionally add userId if you have it
    //   products: cart.map((item) => ({
    //     productId: item.id,
    //     quantity: item.quantity,
    //   })),
    //   totalPrice: getTotalPrice(),
    //   paymentMethod,
    //   address: {
    //     fullName: `${addressData.firstName} ${addressData.lastName}`,
    //     street: addressData.street,
    //     city: addressData.city,
    //     postalCode: addressData.postalCode,
    //     country: addressData.country,
    //   },
    // };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: cart.map((item) => ({
          productId: item.id, // must be string, matching Product.id
          size: item.sizeName,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: getTotalPrice(),
        paymentMethod: paymentMethod.toUpperCase(), // e.g. "CASH", "BLIK", "CARD"
        address: {
          fullName: `${addressData.firstName} ${addressData.lastName}`,
          street: addressData.street,
          city: addressData.city,
          postalCode: addressData.postalCode,
          // country: addressData.country,
        },
        // Optionally add userId if you have it: userId: "..."
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(
              err?.error ||
                (err?.details && JSON.stringify(err.details)) ||
                'Network response was not ok',
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        addOrder(data);
        clearCart();
        alert(
          'Order placed successfully! Check the admin panel to see your order.',
        );
        router.push('/');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Error placing order: ' + error.message);
      });
  }; // Close handleConfirmOrder function

  // Fallback logic for image: only allow valid URLs or absolute paths
  const fallbackImage = '/images/fallback.png';

  return (
    <CheckoutWrapper>
      <div className="flex min-h-screen items-center justify-center font-sans bg-black">
        <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16">
          <div className="w-full max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-700 text-center mb-8">
              Checkout
            </h1>

            {/* Cart Items */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-4">
                Your Order
              </h2>
              <div className="border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-lg bg-gradient-to-br from-white to-orange-50">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <OrderCartItem
                          key={item.id}
                          item={{
                            ...item,
                            size: item.sizeName,
                            price: item.price,
                            imageUrl: item.imageUrl, // adapt property if needed
                          }}
                          fallbackImage={fallbackImage}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between pt-4 mt-4 border-t-2 border-orange-300">
                      <span className="text-xl sm:text-2xl font-bold text-gray-800">
                        Total:
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-orange-600">
                        {getTotalPrice()} zł
                      </span>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Delivery Address - Display Only */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-4">
                Delivery Address
              </h2>
              <div className="border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-lg bg-gradient-to-br from-white to-orange-50 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Name
                  </p>
                  <p className="text-base sm:text-lg text-gray-800">
                    {addressData?.firstName} {addressData?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Contact
                  </p>
                  <p className="text-base sm:text-lg text-gray-800">
                    {addressData?.email}
                  </p>
                  <p className="text-base sm:text-lg text-gray-800">
                    {addressData?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Address
                  </p>
                  <p className="text-base sm:text-lg text-gray-800">
                    {addressData?.street}
                  </p>
                  <p className="text-base sm:text-lg text-gray-800">
                    {addressData?.city}, {addressData?.postalCode}
                  </p>
                  {/* <p className="text-base sm:text-lg text-gray-800">
                    {addressData?.country}
                  </p> */}
                </div>
                {addressData?.additionalInfo && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Additional Information
                    </p>
                    <p className="text-base sm:text-lg text-gray-800">
                      {addressData?.additionalInfo}
                    </p>
                  </div>
                )}
                <a
                  href="/address"
                  className="inline-block text-orange-600 hover:text-orange-700 font-bold mt-2 underline"
                >
                  Edit Address
                </a>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-4">
                Payment Method
              </h2>
              <div className="border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-lg bg-gradient-to-br from-white to-orange-50 space-y-3">
                <label className="flex items-center p-3 sm:p-4 border-2 border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100 hover:border-orange-400 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="blik"
                    checked={paymentMethod === 'blik'}
                    onChange={() => setPaymentMethod('blik')}
                    className="mr-3 w-4 h-4 text-orange-600"
                  />
                  <span className="font-semibold text-gray-800">BLIK</span>
                </label>
                <label className="flex items-center p-3 sm:p-4 border-2 border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100 hover:border-orange-400 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-3 w-4 h-4 text-orange-600"
                  />
                  <span className="font-semibold text-gray-800">
                    Card Payment
                  </span>
                </label>
                <label className="flex items-center p-3 sm:p-4 border-2 border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100 hover:border-orange-400 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="mr-3 w-4 h-4 text-orange-600"
                  />
                  <span className="font-semibold text-gray-800">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </section>

            {/* Confirm Order Button */}
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg sm:text-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              style={{ cursor: 'pointer' }}
            >
              Confirm Order - {getTotalPrice()} zł
            </button>
          </div>
        </main>
      </div>
    </CheckoutWrapper>
  );
}

'use client';
import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import React from 'react';
import { CardTile } from '../../components/CardTile';
import { Banner } from '../../components/Banner';
import AboutUs from '../../components/AboutUs';
import { useMenu } from '../../context/MenuContext';
import { prisma } from '../../lib/prisma';

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  productIngredient?: { Ingredient: { name: string } }[];
  productSize?: { sizeName: string; price: number }[];
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pizzas, setPizzas] = useState<Product[]>([]);
  const [sauces, setSauces] = useState<Product[]>([]);
  const [drinks, setDrinks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // const products = await prisma.product.findMany();
  useEffect(() => {
    let didTimeout = false;
    const timeoutId = setTimeout(() => {
      didTimeout = true;
      setLoadError(true);
      setLoading(false);
    }, 7000); // 7 seconds timeout

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');

        if (didTimeout) return;
        const data = await res.json();
        const productsArray = Array.isArray(data) ? data : data.products;
        setProducts(productsArray);
        console.log('Fetch response:', data);

        if (productsArray) {
          const pizzas = productsArray.filter(
            (item: any) => item.category.toLowerCase() === 'pizza',
          );
          console.log('Fetched pizzas:', pizzas);
          setPizzas(pizzas);
          const sauces = productsArray.filter(
            (item: any) => item.category.toLowerCase() === 'sauce',
          );
          setSauces(sauces);
          const drinks = productsArray.filter(
            (item: any) => item.category.toLowerCase() === 'drink',
          );
          setDrinks(drinks);
        } else {
          setLoadError(true);
        }

        setLoading(false);
        clearTimeout(timeoutId);
      } catch (err) {
        if (!didTimeout) {
          setLoadError(true);
          setProducts([]);
          setPizzas([]);
          setSauces([]);
          setDrinks([]);
          setLoading(false);
        }
        clearTimeout(timeoutId);
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <Banner />

      <div className="flex min-h-screen items-center justify-center font-sans">
        <main className="bg-black flex min-h-screen w-full max-w-6xl flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16">
          <div className="flex flex-col gap-4 w-full max-w-4xl">
            {loadError ? (
              <div className="text-center text-red-600 font-bold my-4 text-xl">
                Error loading products. Please try again later.
              </div>
            ) : (
              <>
                {loading && (
                  <div>
                    <div className="rounded-xl p-3 sm:p-5 shadow-lg bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400 animate-pulse mb-6">
                      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg shadow-md bg-gray-200 mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    </div>
                    <div className="rounded-xl p-3 sm:p-5 shadow-lg bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400 animate-pulse mb-6">
                      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg shadow-md bg-gray-200 mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    </div>
                    <div className="rounded-xl p-3 sm:p-5 shadow-lg bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400 animate-pulse mb-6">
                      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg shadow-md bg-gray-200 mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    </div>
                  </div>
                )}
                {pizzas.length > 0 && (
                  <>
                    <h3
                      id="pizzas"
                      className="text-2xl sm:text-3xl font-bold text-orange-700 text-center sm:mt-0 md:mt-8 lg:mt-0"
                    >
                      Pizzas
                    </h3>
                    {!loading &&
                      pizzas.map((product, index) => (
                        <CardTile
                          key={`${product.name}-${index}`}
                          id={product.id}
                          name={product.name}
                          imageUrl={product.imageUrl}
                          ingredients={product.productIngredient}
                          sizes={product.productSize}
                        />
                      ))}
                  </>
                )}
                <br />
                {sauces.length > 0 && (
                  <>
                    {' '}
                    <h3
                      id="sauces"
                      className="text-2xl sm:text-3xl font-bold text-orange-700 text-center"
                    >
                      Sauces
                    </h3>
                    {!loading &&
                      sauces.map((product, index) => (
                        <CardTile
                          id={product.id}
                          key={`${product.name}-${index}`}
                          name={product.name}
                          imageUrl={product.imageUrl}
                          ingredients={product.productIngredient}
                          sizes={product.productSize}
                        />
                      ))}
                  </>
                )}

                <br />
                {drinks.length > 0 && (
                  <>
                    <h3
                      id="drinks"
                      className="text-2xl sm:text-3xl font-bold text-orange-700 text-center"
                    >
                      Drinks
                    </h3>
                    {!loading &&
                      drinks.map((product, index) => (
                        <CardTile
                          id={product.id}
                          key={`${product.name}-${index}`}
                          name={product.name}
                          imageUrl={product.imageUrl}
                          ingredients={product.productIngredient}
                          sizes={product.productSize}
                        />
                      ))}
                  </>
                )}
              </>
            )}
            <AboutUs />
          </div>
        </main>
      </div>
    </div>
  );
}

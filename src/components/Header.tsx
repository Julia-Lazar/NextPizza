"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { login, logout } from "@/lib/actions/auth";

import type { Session } from "next-auth";

export const Header = ({ session }: { session?: Session | null }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { setIsCartOpen } = useCart();
  const hideCart = pathname === "/address" || pathname === "/checkout";
  // const { data: session } = useSession();

  return (
    <header className="border-b-2 border-orange-200 shadow-md bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 sm:h-28 mr-2">
          <a href="/" className="flex items-center h-full py-2 cursor-pointer">
            <Image
              src="/next-pizza.svg"
              alt="Next Pizza"
              width={200}
              height={83}
              className="h-full w-auto"
              priority
            />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-orange-600 p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-8 items-center">
            <a
              href="/#pizzas"
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors text-sm lg:text-base"
            >
              Pizzas
            </a>
            <a
              href="/#sauces"
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors text-sm lg:text-base"
            >
              Sauces
            </a>
            <a
              href="/#drinks"
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors text-sm lg:text-base"
            >
              Drinks
            </a>
            <a
              href="/#about"
              className="text-gray-700 hover:text-orange-600 font-semibold transition-colors text-sm lg:text-base"
            >
              About
            </a>
            <a
              href="/#contact"
              className="text-gray-700 hover:text-orange-600 font-semibold transition-colors text-sm lg:text-base"
            >
              Contact
            </a>
            {session?.user ? (
              <a
                href="/#signout"
                className="text-gray-700 hover:text-orange-600 font-semibold transition-colors text-sm lg:text-base"
                onClick={() => logout()}
              >
                Log out
              </a>
            ) : (
              <>
                <a
                  href="/#signin"
                  className="text-gray-700 hover:text-orange-600 font-semibold transition-colors text-sm lg:text-base"
                  onClick={() => login()}
                >
                  Login
                </a>
                <a
                  href="/#signup"
                  className="text-gray-700 hover:text-orange-600 font-semibold transition-colors text-sm lg:text-base"
                >
                  Sign Up!
                </a>
              </>
            )}

            {!hideCart && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-orange-600 hover:text-orange-700 transition-colors"
                aria-label="Open cart"
                style={{ cursor: "pointer" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            )}
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-3 pb-4">
            <a
              href="/#pizzas"
              onClick={() => setIsMenuOpen(false)}
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors py-2"
            >
              Pizzas
            </a>
            <a
              href="/#sauces"
              onClick={() => setIsMenuOpen(false)}
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors py-2"
            >
              Sauces
            </a>
            <a
              href="/#drinks"
              onClick={() => setIsMenuOpen(false)}
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors py-2"
            >
              Drinks
            </a>
            <a
              href="/#about"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-orange-600 font-semibold transition-colors py-2"
            >
              About
            </a>
            <a
              href="/#contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-orange-600 font-semibold transition-colors py-2"
            >
              Contact
            </a>
            {!session?.user ? (
              <>
                <a
                  href="/#contact"
                  onClick={() => {
                    setIsMenuOpen(false);
                    login();
                  }}
                  className="text-gray-700 hover:text-orange-600 font-semibold transition-colors py-2"
                >
                  Login
                </a>
                <a
                  href="/#signup"
                  onClick={() => {
                    setIsMenuOpen(false);
                    login();
                  }}
                  className="text-gray-700 hover:text-orange-600 font-semibold transition-colors py-2"
                >
                  Sign Up!
                </a>
              </>
            ) : (
              <a
                href="/#signup"
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                className="text-gray-700 hover:text-orange-600 font-semibold transition-colors py-2"
              >
                Sign Out <div>{session?.user?.name}</div>
              </a>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

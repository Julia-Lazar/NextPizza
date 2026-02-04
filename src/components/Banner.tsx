import React from "react";
import Image from "next/image";

export const Banner: React.FC = () => {
  return (
    <section className="min-h-[calc(100vh-7rem)] md:h-[calc(100vh-7rem)] flex items-center pt-4 pb-8 px-2 md:mt-32 lg:mt-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left side - Text */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100">
              Authentic Pizza
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200">
              We've been making pizzas for over 25 years, preserving traditional
              Italian recipes and using only the freshest ingredients.
            </p>
            <div className="bg-orange-100 p-4 sm:p-6 rounded-lg inline-block">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                Opening Hours
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                11:00 - 23:00
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[460px] rounded-[60px_20px_60px_20px] overflow-hidden shadow-2xl">
            <Image
              src="/images/oven.webp"
              alt="Delicious pizza"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

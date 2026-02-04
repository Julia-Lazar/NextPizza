import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section
      id="about"
      className="about-us-section min-h-screen flex flex-col justify-center items-center px-4 py-12 scroll-mt-0"
    >
      <div className="max-w-3xl w-full text-center color-white rounded-2xl shadow-xl p-8  backdrop-blur-md">
        <h2 className="text-4xl font-extrabold mb-6 text-orange-700 drop-shadow-lg">
          About Us
        </h2>
        <p className="text-lg mb-6 text-white">
          Welcome to{" "}
          <span className="font-semibold text-orange-600">NextPizza</span>! We
          are passionate about delivering the freshest and most delicious pizzas
          right to your doorstep. Our team is dedicated to using only the
          highest quality ingredients and providing exceptional service to our
          valued customers.
        </p>
        <p className="text-lg mb-6 text-white">
          Whether you crave a classic Margherita, a spicy Pepperoni, or a custom
          creation, we have something for everyone. Thank you for choosing
          <span className="font-semibold text-orange-600"> NextPizza</span> –
          where every slice is made with love!
        </p>
        <p className="text-md text-gray-400 italic">
          Serving you since 2025 🍕
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

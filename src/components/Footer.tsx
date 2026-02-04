import React from "react";
import Contact from "./Contact";

export const Footer = () => {
  return (
    <footer className="border-t-2 border-orange-200 shadow-md bg-gradient-to-r from-white to-orange-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <Contact />
        <p className="text-center text-gray-700 font-medium mt-8">
          © 2025 Pizza app by Julia Dmytrenko
        </p>
      </div>
    </footer>
  );
};

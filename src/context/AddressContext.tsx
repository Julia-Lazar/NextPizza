"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AddressData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  additionalInfo: string;
}

interface AddressContextType {
  addressData: AddressData | null;
  setAddressData: (data: AddressData) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);

  return (
    <AddressContext.Provider value={{ addressData, setAddressData }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddress } from "../../../context/AddressContext";
import { FormInput } from "../../../components/FormInput";
import { FormTextarea } from "../../../components/FormTextarea";
import { z } from "zod";

// 1. Define the Zod schema
const addressSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z\s\u00C0-\u017F]+$/, "First name can only contain letters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z\s\u00C0-\u017F]+$/, "Last name can only contain letters"),
  email: z.email("Please enter a valid email address").trim(),
  phone: z
    .string()
    .trim()
    .min(9, "Phone number must be at least 9 digits")
    .max(15, "Phone number is too long")
    .regex(
      /^\D*(\d\D*){9,15}$/,
      "Phone number must be between 9 and 15 digits"
    ),
  street: z
    .string()
    .trim()
    .min(5, "Street address must be at least 5 characters"),
  city: z
    .string()
    .trim()
    .min(2, "City name must be at least 2 characters")
    .regex(/^[a-zA-Z\s\u00C0-\u017F-]+$/, "City name can only contain letters"),
  postalCode: z
    .string()
    .trim()
    .min(3, "Postal code is too short")
    .regex(/^[0-9A-Z\s-]+$/, "Please enter a valid postal code"),
  country: z
    .string()
    .trim()
    .min(2, "Country name must be at least 2 characters"),
  additionalInfo: z.string().trim().optional(),
});

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export default function AddressPage() {
  const router = useRouter();
  const { setAddressData } = useAddress();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string | undefined => {
    const partialData = { [name]: value };
    const partialSchema = addressSchema.pick({ [name]: true });
    const result = partialSchema.safeParse(partialData);
    if (!result.success) {
      return result.error.issues[0]?.message;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "additionalInfo") {
        const error = validateField(
          key,
          formData[key as keyof typeof formData]
        );
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field on change if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    // Validate entire form
    if (validateForm()) {
      setAddressData(formData);
      console.log("Form submitted:", formData);
      router.push("/checkout");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Delivery Address</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="firstName"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.firstName}
              touched={touched.firstName}
              required
            />

            <FormInput
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.lastName}
              touched={touched.lastName}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              required
            />

            <FormInput
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              required
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Delivery Address</h2>

          <FormInput
            id="street"
            name="street"
            label="Street Address"
            value={formData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.street}
            touched={touched.street}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              id="city"
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.city}
              touched={touched.city}
              required
            />

            <FormInput
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.postalCode}
              touched={touched.postalCode}
              required
            />

            <FormInput
              id="country"
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.country}
              touched={touched.country}
              required
            />
          </div>

          <FormTextarea
            id="additionalInfo"
            name="additionalInfo"
            label="Additional Information (Optional)"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={3}
            placeholder="Apartment number, delivery instructions, etc."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-orange-600 transition-colors"
          style={{ cursor: "pointer" }}
        >
          Continue to Checkout
        </button>
      </form>
    </div>
  );
}

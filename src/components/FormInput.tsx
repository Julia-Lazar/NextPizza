import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && touched && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

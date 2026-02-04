import React from "react";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder,
  rows = 3,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {required && "*"}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

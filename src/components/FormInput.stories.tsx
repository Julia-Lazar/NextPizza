import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormInput } from "./FormInput";
import { useState } from "react";

const meta = {
  title: "Components/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    value: "",
    onChange: () => {},
    onBlur: () => {},
    placeholder: "Enter your name",
  },
};

export const WithValue: Story = {
  args: {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    value: "user@example.com",
    onChange: () => {},
    onBlur: () => {},
    placeholder: "Enter your email",
  },
};

export const Required: Story = {
  args: {
    id: "phone",
    name: "phone",
    label: "Phone Number",
    type: "tel",
    value: "",
    onChange: () => {},
    onBlur: () => {},
    required: true,
    placeholder: "Enter your phone number",
  },
};

export const WithError: Story = {
  args: {
    id: "email-error",
    name: "email",
    label: "Email",
    type: "email",
    value: "invalid-email",
    onChange: () => {},
    onBlur: () => {},
    error: "Please enter a valid email address",
    touched: true,
    required: true,
  },
};

export const WithErrorUntouched: Story = {
  args: {
    id: "email-untouched",
    name: "email",
    label: "Email",
    type: "email",
    value: "",
    onChange: () => {},
    onBlur: () => {},
    error: "This field is required",
    touched: false,
    required: true,
    placeholder: "Enter your email",
  },
};

export const Interactive: Story = {
  args: {
    id: "interactive",
    name: "interactive",
    label: "Interactive Example",
    type: "text",
    value: "",
    onChange: () => {},
    onBlur: () => {},
    placeholder: "Type at least 3 characters",
  },
  render: () => {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (e.target.value.length < 3 && touched) {
        setError("Must be at least 3 characters");
      } else {
        setError("");
      }
    };

    const handleBlur = () => {
      setTouched(true);
      if (value.length < 3) {
        setError("Must be at least 3 characters");
      }
    };

    return (
      <FormInput
        id="interactive"
        name="interactive"
        label="Interactive Example"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        touched={touched}
        required
        placeholder="Type at least 3 characters"
      />
    );
  },
};

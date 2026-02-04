import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormTextarea } from "./FormTextarea";
import React, { useState } from "react";

const meta = {
  title: "Components/FormTextarea",
  component: FormTextarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "message",
    name: "message",
    label: "Message",
    value: "",
    onChange: () => {},
    placeholder: "Enter your message",
    rows: 3,
  },
};

export const WithValue: Story = {
  args: {
    id: "description",
    name: "description",
    label: "Description",
    value:
      "This is a sample text that has been entered into the textarea field.",
    onChange: () => {},
    placeholder: "Enter description",
    rows: 3,
  },
};

export const Required: Story = {
  args: {
    id: "comments",
    name: "comments",
    label: "Comments",
    value: "",
    onChange: () => {},
    required: true,
    placeholder: "Please enter your comments",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    id: "notes-error",
    name: "notes",
    label: "Special Notes",
    value: "Too short",
    onChange: () => {},
    onBlur: () => {},
    error: "Message must be at least 10 characters long",
    touched: true,
    required: true,
    rows: 4,
  },
};

export const WithErrorUntouched: Story = {
  args: {
    id: "notes-untouched",
    name: "notes",
    label: "Special Notes",
    value: "",
    onChange: () => {},
    onBlur: () => {},
    error: "This field is required",
    touched: false,
    required: true,
    placeholder: "Enter special notes",
    rows: 3,
  },
};

export const LargeTextarea: Story = {
  args: {
    id: "large",
    name: "large",
    label: "Large Textarea",
    value: "",
    onChange: () => {},
    placeholder: "Enter a longer message here",
    rows: 8,
  },
};

export const Interactive: Story = {
  args: {
    id: "interactive",
    name: "interactive",
    label: "Interactive Example",
    value: "",
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (e.target.value.length < 10 && touched) {
        setError("Must be at least 10 characters");
      } else {
        setError("");
      }
    };

    const handleBlur = () => {
      setTouched(true);
      if (value.length < 10) {
        setError("Must be at least 10 characters");
      }
    };

    return (
      <div>
        <FormTextarea
          id="interactive"
          name="interactive"
          label="Interactive Example"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          touched={touched}
          required
          placeholder="Type at least 10 characters"
          rows={5}
        />
        <p className="text-gray-600 text-sm mt-2">
          Character count: {value.length}
        </p>
      </div>
    );
  },
};

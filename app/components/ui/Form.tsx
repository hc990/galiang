import React, { useState } from "react";
import DatePickerPopover from "./DatePickerPopover";

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  validate?: (value: string) => string | null;
}

interface GenericFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field.name];
      let error = "";

      if (field.required && !value) {
        error = `${field.label} is required.`;
      } else if (field.validate) {
        const customError = field.validate(value);
        if (customError) error = customError;
      }

      newErrors[field.name] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="items-center space-x-2 bg-gray-50 p-4 rounded-md shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-1">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors[field.name] && (
              <p className="text-sm text-pink-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-1">
        <div>
          <label>Start</label><DatePickerPopover />
        </div>
        <div>
          <label>End</label> <DatePickerPopover />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;
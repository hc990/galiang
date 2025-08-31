
import React, { useState } from "react";
import SelectField from "./SelectField";
import DatePickerPopover from "./DatePickerPopover";
import { parse } from "date-fns";
import Button from "./Button";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea" | "checkbox" | "radio" | "select" | "datepicker";
  required?: boolean;
  validate?: (value: string | boolean) => string | null;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

interface GenericFormProps {
  buttonType: number;
  fields: FormField[];
  onSubmit: (data: Record<string, string | boolean>) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ buttonType, fields, onSubmit }) => {
  const initialFormData = fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === "checkbox" ? false : "" }), {});
  const initialErrors = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === "checkbox" ? false : "" }), {})
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

      if (field.required && (value === "" || value === false)) {
        error = `${field.label} is required.`;
      } else if (field.validate) {
        const customError = field.validate(value);
        if (customError) error = customError;
      } else if (field.type === "number" && typeof value === "string") {
        const numValue = parseFloat(value);
        if (field.min !== undefined && numValue < field.min) {
          error = `${field.label} must be at least ${field.min}.`;
        } else if (field.max !== undefined && numValue > field.max) {
          error = `${field.label} cannot exceed ${field.max}.`;
        }
      } else if (field.type === "datepicker" && typeof value === "string") {
        const date = parse(value, "yyyy-MM-dd", new Date());
        if (isNaN(date.getTime())) {
          error = `${field.label} must be a valid date (YYYY-MM-DD).`;
        }
      }

      newErrors[field.name] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };
  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] as string,
      onChange: handleChange,
      className: `border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors[field.name] ? "border-pink-500" : ""
        }`,
    };
    switch (field.type) {
      case "select":
        return (
          <SelectField
            name={field.name}
            label={field.label}
            options={field.options || []}
            value={formData[field.name] as string}
            onChange={handleChange}
            error={errors[field.name]}
            required={field.required}
          />
        );
      case "datepicker":
        return (
          <DatePickerPopover
            name={field.name}
            label={field.label}
            value={formData[field.name] as string}
            onChange={handleChange}
            error={errors[field.name]}
            required={field.required}
          />
        );
      case "textarea":
        return (
          <>
            <label
              htmlFor={field.name}
              className="block font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-pink-500">*</span>}
            </label>
            <textarea
              {...commonProps}
              placeholder={field.placeholder || ""}
              rows={4}
            />
            {errors[field.name] && (
              <p className="text-sm text-pink-500 mt-1">{errors[field.name]}</p>
            )}
          </>
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={formData[field.name] as boolean}
              onChange={handleChange}
              className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label
              htmlFor={field.name}
              className="ml-2 block font-medium text-gray-700"
            >
              {field.label}
              {field.required && <span className="text-pink-500">*</span>}
            </label>
            {errors[field.name] && (
              <p className="text-sm text-pink-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        );
      case "radio":
        return (
          <>
            <label className="block font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-pink-500">*</span>}
            </label>
            <div className="flex flex-wrap gap-4">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors[field.name] && (
              <p className="text-sm text-pink-500 mt-1">{errors[field.name]}</p>
            )}
          </>
        );
      case "number":
        return (
          <>
            <label
              htmlFor={field.name}
              className="block font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-pink-500">*</span>}
            </label>
            <input
              type="number"
              {...commonProps}
              min={field.min}
              max={field.max}
              step={field.step}
              placeholder={field.placeholder || ""}
            />
            {errors[field.name] && (
              <p className="text-sm text-pink-500 mt-1">{errors[field.name]}</p>
            )}
          </>
        );
      default: // text, email, password
        return (
          <>
            <label
              htmlFor={field.name}
              className="block font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-pink-500">*</span>}
            </label>
            <input
              type={field.type}
              {...commonProps}
              placeholder={field.placeholder || ""}
            />
            {errors[field.name] && (
              <p className="text-sm text-pink-500 mt-1">{errors[field.name]}</p>
            )}
          </>
        );
    }
  };
  return (
    <div className="items-center space-x-2 bg-gray-50 p-4 rounded-md shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-1">
        {fields.map((field) => (
          <div key={field.name}>{renderField(field)}</div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-1">
        <div>
        </div>
        <div>
          <label
            className="block font-medium text-gray-700 mb-1"
          >
          </label>
        </div>
        <div>
          <label
            className="block font-medium text-gray-700 mb-1"
          >
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-1">
        <div>
        </div>
        <div className='text-right' >
        </div>
        <div className="flex flex-wrap justify-end">
          <Button
            variant="outline"
            type="reset"
            onClick={handleClear}
            className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
          >
            重置
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handleSubmit}
            className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
          >
            {buttonType === 0 ? '提交' : '查询'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;

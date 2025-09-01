import React, { useState } from "react";
import { isBefore, parse, isValid } from "date-fns";
import SelectField from "./SelectField";
import DatePickerPopover from "./DatePickerPopover";
import Button from "./Button";
import DateRangePicker from "./DateRangePicker";
import { Alert, AlertTitle, AlertDescription } from "./Alert";
            
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "checkbox"
    | "radio"
    | "select"
    | "datepicker"
    | "daterangepicker";
  required?: boolean;
  validate?: (value: string | boolean, formData: Record<string, string | boolean>) => string | null;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  relatedField?: string; // For daterangepicker, link start and end fields
}

interface GenericFormProps {
  buttonType: number;
  fields: FormField[];
  onSubmit: (data: Record<string, string | boolean>) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ buttonType, fields, onSubmit }) => {
  const initialFormData = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.type === "checkbox" ? false : "",
      ...(field.type === "daterangepicker" && field.relatedField
        ? { [field.relatedField]: "" }
        : {}),
    }),
    {}
  );
  const initialErrors = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: "",
      ...(field.type === "daterangepicker" && field.relatedField
        ? { [field.relatedField]: "" }
        : {}),
    }),
    {}
  );
  const [formData, setFormData] = useState<Record<string, string | boolean>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>(initialErrors);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let _isValid = true;

    fields.forEach((field) => {
      const value = formData[field.name];
      let error = "";
      
      if (field.required && (value === "" || value === false)) {
        error = `${field.label} is required.`;
      } else if (field.validate) {
        const customError = field.validate(value, formData);
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
        if (value && !isValid(date)) {
          error = `${field.label} must be a valid date (YYYY-MM-DD).`;
        }
      } else if (field.type === "daterangepicker" && typeof value === "string" && field.relatedField) {
        const startDate = parse(value, "yyyy-MM-dd", new Date());
        const endDate = parse(formData[field.relatedField] as string, "yyyy-MM-dd", new Date());
        if (value && !isValid(startDate)) {
          error = `${field.label} must be a valid date (YYYY-MM-DD).`;
        } else if (
          field.relatedField &&
          formData[field.relatedField] &&
          isValid(startDate) &&
          isValid(endDate) &&
          !isBefore(startDate, endDate)
        ) {
          error = `${field.label} must be before ${fields.find((f) => f.name === field.relatedField)?.label || "end date"}.`;
        }
        // Validate end date
        if (field.relatedField && formData[field.relatedField]) {
          const endError =
            !isValid(endDate) && formData[field.relatedField] !== ""
              ? `${
                  fields.find((f) => f.name === field.relatedField)?.label || "End date"
                } must be a valid date (YYYY-MM-DD).`
              : "";
          newErrors[field.relatedField] = endError;
          if (endError) _isValid = false;
        }
      }

      newErrors[field.name] = error;
      if (error) _isValid = false;
    });

    setErrors(newErrors);
    return _isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
    setSubmitError(null); // Clear submit error
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setSubmitError(null);
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    } else {
      setSubmitError("Please fix the errors in the form before submitting.");
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] as string,
      onChange: handleChange,
      className: `border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 ${
        errors[field.name] ? "border-pink-500" : ""
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
            autoDismissPopover={8000}
          />
        );
      case "daterangepicker":
        return (
          <DateRangePicker
            startName={field.name}
            endName={field.relatedField || `${field.name}_end`}
            startLabel={field.label}
            endLabel={fields.find((f) => f.name === field.relatedField)?.label || "End Date"}
            startValue={formData[field.name] as string}
            endValue={formData[field.relatedField || `${field.name}_end`] as string}
            onChange={handleChange}
            startError={errors[field.name]}
            endError={field.relatedField ? errors[field.relatedField] : ""}
            required={field.required}
            autoDismissPopover={8000}
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
    <div className="bg-gray-50 p-6 rounded-md shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "daterangepicker" ? "col-span-1 sm:col-span-2" : "col-span-1"}
          >
            {renderField(field)}
          </div>
        ))}
      </div>
      {submitError && (
        <Alert variant="destructive" autoDismiss={5000} className="mb-4">
          <AlertTitle>Form Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          type="reset"
          onClick={handleClear}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-400"
        >
          重置
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleSubmit}
          className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
        >
          {buttonType === 0 ? "提交" : "查询"}
        </Button>
      </div>
    </div>
  );
};

export default GenericForm;
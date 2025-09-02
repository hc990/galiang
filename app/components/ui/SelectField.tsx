import React from "react";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-pink-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`border border-pink-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 ${
          error ? "border-pink-500" : ""
        }`}
      >
        <option value="" disabled>
          请选择
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-pink-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;

import React, { useState } from "react";
import DatePickerPopover from "./DatePickerPopover";

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = { username: "", email: "", password: "" };
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center space-x-2 bg-gray-50 p-4 rounded-md shadow-md"
    >
      {/* 第一行：Username 和 Email */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-1">
        <div>
          <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.username && (
            <p className="text-sm text-pink-500 mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.email && (
            <p className="text-sm text-pink-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {errors.password && (
          <p className="text-sm text-pink-500 mt-1">{errors.password}</p>
        )}
      </div>
      </div>

      {/* 第二行：Password */}
      

      {/* 第三行：Start Date 和 End Date */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-1">
        <div>
          <label htmlFor="start-date" className="block font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <DatePickerPopover />
        </div>
        <div>
          <label htmlFor="end-date" className="block font-medium text-gray-700 mb-1">
            End Date
          </label>
          <DatePickerPopover />
        </div>
        <div>
        <label htmlFor="end-date" className="block font-medium text-gray-700 mb-1">
             _
          </label>
            <button
                type="submit"
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
            >
            Submit
         </button>
        </div>
      </div>
      {/* 提交按钮 */}
    </form>
  );
};

export default Form;

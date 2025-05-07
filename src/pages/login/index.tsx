import React from "react";
import { useFormInput } from "@/hooks/useFormInput";
import { Link } from "react-router"; // Adjust path if needed

const LoginPage = () => {
  const emailInput = useFormInput("");
  const passwordInput = useFormInput("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", emailInput.value, "Password:", passwordInput.value);
    // Example: You might want to clear fields after login or redirect
    // emailInput.setValue('');
    // passwordInput.setValue('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="space-y-8">
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`
                absolute left-3 transition-all duration-300 ease-in-out
                ${
                  emailInput.isFocused || emailInput.value
                    ? "top-[-0.75rem] text-xs bg-white px-1 text-blue-600"
                    : "top-3 text-gray-500"
                }
              `}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={emailInput.value}
              onChange={emailInput.onChange}
              onFocus={emailInput.onFocus}
              onBlur={emailInput.onBlur}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`
                absolute left-3 transition-all duration-300 ease-in-out
                ${
                  passwordInput.isFocused || passwordInput.value
                    ? "top-[-0.75rem] text-xs bg-white px-1 text-blue-600"
                    : "top-3 text-gray-500"
                }
              `}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={passwordInput.value}
              onChange={passwordInput.onChange}
              onFocus={passwordInput.onFocus}
              onBlur={passwordInput.onBlur}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
      {/* <footer className="mt-12 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer> */}
    </div>
  );
};

export default LoginPage;

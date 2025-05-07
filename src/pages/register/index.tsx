import { useState } from "react";
import { useFormInput } from "@/hooks/useFormInput"; // Adjust path if needed

const RegisterPage = () => {
  const fullNameInput = useFormInput("");
  const emailInput = useFormInput("");
  const passwordInput = useFormInput("");
  const confirmPasswordInput = useFormInput("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (passwordInput.value !== confirmPasswordInput.value) {
      setError("Passwords do not match.");
      return;
    }

    if (passwordInput.value.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Handle registration logic here
    console.log(
      "Full Name:",
      fullNameInput.value,
      "Email:",
      emailInput.value,
      "Password:",
      passwordInput.value
    );
    alert("Registration successful! (Check console for details)");
    // Example: You might want to clear fields after registration or redirect
    // fullNameInput.setValue('');
    // emailInput.setValue('');
    // passwordInput.setValue('');
    // confirmPasswordInput.setValue('');
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow";
  const focusedLabelClass =
    "top-[-0.75rem] text-xs bg-white px-1 text-indigo-600";
  const unfocusedLabelClass = "top-3 text-gray-500";

  const createLabelClasses = (input: any) => {
    return `absolute left-3 transition-all duration-300 ease-in-out ${
      input.isFocused || input.value ? focusedLabelClass : unfocusedLabelClass
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          Create Account
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleRegister} className="space-y-8">
          {/* Full Name Input */}
          <div className="relative">
            <label
              htmlFor="fullName"
              className={createLabelClasses(fullNameInput)}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...fullNameInput} // Spread the hook's props
              required
              className={inputClass}
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <label htmlFor="email" className={createLabelClasses(emailInput)}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...emailInput}
              required
              className={inputClass}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className={createLabelClasses(passwordInput)}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...passwordInput}
              required
              className={inputClass}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className={createLabelClasses(confirmPasswordInput)}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...confirmPasswordInput}
              required
              className={inputClass}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform active:scale-95"
          >
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

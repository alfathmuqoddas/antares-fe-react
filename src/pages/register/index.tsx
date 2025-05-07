import { useState } from "react";
import { useFormInput } from "@/hooks/useFormInput"; // Adjust path if needed
// import { useSWRConfig } from 'swr'; // Not strictly needed here if not revalidating SWR keys immediately

const RegisterPage = () => {
  const fullNameInput = useFormInput("");
  const emailInput = useFormInput("");
  const passwordInput = useFormInput("");
  const confirmPasswordInput = useFormInput("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const { mutate } = useSWRConfig(); // Uncomment if you need to mutate SWR keys after registration

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (passwordInput.value !== confirmPasswordInput.value) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (passwordInput.value.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullNameInput.value, // API expects 'name'
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      // Registration successful
      console.log("Registration successful:", data);
      setSuccessMessage(
        data.message || "Registration successful! Please login."
      );
      // Optionally, you could auto-login the user here by calling your login logic
      // or redirect to the login page.

      // Clear form fields
      fullNameInput.setValue("");
      emailInput.setValue("");
      passwordInput.setValue("");
      confirmPasswordInput.setValue("");

      // If you auto-logged in the user, you might want to mutate SWR keys:
      // mutate('/api/user');
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-8">
          Create Account
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm text-center mb-4">
            {successMessage}
          </p>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
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
              {...fullNameInput}
              required
              disabled={isLoading}
              className={`${inputClass} ${isLoading ? "bg-gray-50" : ""}`}
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
              disabled={isLoading}
              className={`${inputClass} ${isLoading ? "bg-gray-50" : ""}`}
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
              disabled={isLoading}
              className={`${inputClass} ${isLoading ? "bg-gray-50" : ""}`}
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
              disabled={isLoading}
              className={`${inputClass} ${isLoading ? "bg-gray-50" : ""}`}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            /* Replace with actual link e.g., <Link to="/login"> */ className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </a>
        </p>
      </div>
      <footer className="mt-12 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default RegisterPage;

import { useState } from "react";
import { useFormInput } from "@/hooks/useFormInput"; // Adjust path if needed
import { useSWRConfig } from "swr"; // To revalidate other SWR keys
import useAuth from "@/store/useAuth";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const emailInput = useFormInput("");
  const passwordInput = useFormInput("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        // Corrected port to 3000 based on common usage, was 300 in prompt
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials."
        );
      }
      console.log("Login successful:", data);
      login(data);
      alert("Login successful! Redirecting...");
      emailInput.setValue("");
      passwordInput.setValue("");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";
  const focusedLabelClass =
    "top-[-0.75rem] text-xs bg-white px-1 text-blue-600";
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
          Welcome Back
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
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

          <div className="flex items-center justify-between text-sm">
            <a
              href="#" // Replace with actual link if using React Router, e.g., <Link to="/forgot-password">
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            /* Replace with actual link e.g., <Link to="/register"> */ className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </a>
        </p>
      </div>
      <footer className="mt-12 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;

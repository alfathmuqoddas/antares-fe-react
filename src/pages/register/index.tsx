import { useState } from "react";
import { useFormInput } from "@/hooks/useFormInput";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useNavigate, Link } from "react-router";

export type TUserRegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type TUserRegisterResponse = {
  message: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const fullNameInput = useFormInput("");
  const emailInput = useFormInput("");
  const passwordInput = useFormInput("");
  const confirmPasswordInput = useFormInput("");

  const [errorInput, setErrorInput] = useState("");

  const { trigger, isMutating } = useApiMutation<
    TUserRegisterResponse,
    any,
    TUserRegisterDto
  >("/auth/register", {
    method: "POST",
    onSuccess: (data) => {
      alert(data.message || "Registration successful! Please login.");
      navigate("/login");
    },
    onError: (err) => {
      console.error("Registration error:", err);
      alert(err.message || "An unexpected error occurred.");
    },
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorInput("");

    if (passwordInput.value !== confirmPasswordInput.value) {
      setErrorInput("Passwords do not match.");
      return;
    }

    if (passwordInput.value.length < 6) {
      setErrorInput("Password must be at least 6 characters long.");
      return;
    }

    await trigger({
      name: fullNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
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
              disabled={isMutating}
              className={`${inputClass} ${isMutating ? "bg-gray-50" : ""}`}
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
              disabled={isMutating}
              className={`${inputClass} ${isMutating ? "bg-gray-50" : ""}`}
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
              disabled={isMutating}
              className={`${inputClass} ${isMutating ? "bg-gray-50" : ""}`}
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
              disabled={isMutating}
              className={`${inputClass} ${isMutating ? "bg-gray-50" : ""}`}
            />
          </div>

          {errorInput && (
            <div className="text-red-500 text-sm mt-1">{errorInput}</div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={isMutating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {isMutating ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign In
            </span>
          </Link>
        </p>
      </div>
      <footer className="mt-12 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default RegisterPage;

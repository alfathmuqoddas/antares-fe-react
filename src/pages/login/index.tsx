import { useFormInput } from "@/hooks/useFormInput"; // Adjust path if needed
import useAuth from "@/store/useAuth";
import { useNavigate, Link } from "react-router";
import { useApiMutation } from "@/hooks/useApiMutation";

export type TUserLoginDto = {
  email: string;
  password: string;
};

export type TUserLoginResponse = {
  access_token: string;
  additionalInfo: {
    roles: string;
    email: string;
    name: string;
    userId: string;
  };
};

const LoginPage = () => {
  const emailInput = useFormInput("");
  const passwordInput = useFormInput("");
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();

  const { trigger, isMutating, error } = useApiMutation<
    TUserLoginResponse,
    any,
    TUserLoginDto
  >("/auth/login", {
    method: "POST",
    onSuccess: (data) => {
      login({
        accessToken: data.access_token,
        additionalInfo: data.additionalInfo,
      });
      alert("Login successful! Redirecting...");
      navigate("/");
    },
    onError: (err) => {
      console.error("Login error:", err);
      alert(err.message || "An unexpected error occurred.");
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await trigger({ email: emailInput.value, password: passwordInput.value });
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
            disabled={isMutating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {isMutating ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
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

export default LoginPage;

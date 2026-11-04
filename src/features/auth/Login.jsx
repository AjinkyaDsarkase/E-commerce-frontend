import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { loginUser } from "./authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    dispatch(loginUser({ name: form.email.split("@")[0], email: form.email }));
    navigate("/profile");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="animate-scale-in w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900 text-sm font-black text-white">
              S
            </span>
            <span className="text-lg font-black text-gray-900">ShopEasy</span>
          </div>

          <h1 className="text-2xl font-black text-gray-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account to continue</p>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative">
                <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
            >
              Sign In
              <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-gray-900 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;

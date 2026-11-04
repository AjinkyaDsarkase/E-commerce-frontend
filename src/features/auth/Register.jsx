import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { registerUser } from "./authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    dispatch(registerUser({ name: form.name, email: form.email }));
    navigate("/profile");
  }

  const fields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", icon: <FiUser size={16} /> },
    { id: "email", label: "Email address", type: "email", placeholder: "you@example.com", icon: <FiMail size={16} /> },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••", icon: <FiLock size={16} /> },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="animate-scale-in w-full max-w-md">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60">
          <div className="mb-8 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900 text-sm font-black text-white">
              S
            </span>
            <span className="text-lg font-black text-gray-900">ShopEasy</span>
          </div>

          <h1 className="text-2xl font-black text-gray-900">Create account</h1>
          <p className="mt-1 text-sm text-gray-500">Join ShopEasy and start shopping</p>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {fields.map(({ id, label, type, placeholder, icon }) => (
              <div key={id}>
                <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-700">
                  {label}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                  </span>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={form[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
            >
              Create Account
              <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-gray-900 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;

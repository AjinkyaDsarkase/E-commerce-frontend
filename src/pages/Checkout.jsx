import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiMapPin, FiHash, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { placeOrder } from "../features/orders/orderSlice";
import { removeFromCart } from "../features/cart/cartSlice";

const fields = [
  { id: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", icon: <FiUser size={15} />, col: 1 },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com", icon: <FiMail size={15} />, col: 1 },
  { id: "address", label: "Street Address", type: "text", placeholder: "123 Main St", icon: <FiMapPin size={15} />, col: 2 },
  { id: "city", label: "City", type: "text", placeholder: "New York", icon: <FiMapPin size={15} />, col: 1 },
  { id: "zip", label: "ZIP Code", type: "text", placeholder: "10001", icon: <FiHash size={15} />, col: 1 },
];

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [form, setForm] = useState({ fullName: "", email: "", address: "", city: "", zip: "" });
  const [error, setError] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      setError("Please fill in all fields.");
      return;
    }
    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total,
      status: "Confirmed",
      shippingAddress: form,
    };
    dispatch(placeOrder(order));
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
    navigate("/order-success", { state: { orderId: order.id } });
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="animate-fade-up text-center">
          <FiShoppingBag size={40} className="mx-auto text-gray-300" />
          <h1 className="mt-4 text-xl font-black text-gray-900">Your cart is empty</h1>
          <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-gray-900 hover:underline">
            Browse Products →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-fade-up">
        <h1 className="text-3xl font-black text-gray-900">Checkout</h1>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Form */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-black text-gray-900">
                <FiMapPin size={18} className="text-gray-400" />
                Shipping Information
              </h2>

              {error && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {fields.map(({ id, label, type, placeholder, icon, col }) => (
                    <div key={id} className={col === 2 ? "sm:col-span-2" : ""}>
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
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
                >
                  Place Order — ${total.toFixed(2)}
                  <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-900">Order Summary</h2>
            <ul className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-1">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="shrink-0 text-sm font-black text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 font-black text-gray-900">
                <span>Total</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;

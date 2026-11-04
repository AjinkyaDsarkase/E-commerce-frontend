import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { updateQuantity, removeFromCart } from "../features/cart/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="animate-fade-up text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <FiShoppingBag size={32} className="text-gray-400" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Start Shopping <FiArrowRight size={15} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-fade-up">
        <h1 className="text-3xl font-black text-gray-900">
          Shopping Cart
          <span className="ml-2 text-lg font-semibold text-gray-400">({totalItems})</span>
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <section className="space-y-4 lg:col-span-2">
            {cartItems.map((item, i) => (
              <article
                key={item.id}
                className={`animate-fade-up stagger-${Math.min(i + 1, 4)} flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-2">
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        {item.category}
                      </p>
                      <h2 className="mt-0.5 line-clamp-2 text-sm font-semibold text-gray-900">
                        {item.title}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        disabled={item.quantity === 1}
                        className="px-3 py-1.5 text-sm font-bold text-gray-600 transition hover:bg-gray-200 disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="px-3 py-1.5 text-sm font-bold text-gray-600 transition hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-base font-black text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-900">Order Summary</h2>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
            </div>

            <div className="mt-5 flex justify-between border-t border-gray-100 pt-5">
              <span className="text-base font-black text-gray-900">Total</span>
              <span className="text-xl font-black text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
            >
              Proceed to Checkout
              <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              to="/products"
              className="mt-3 block text-center text-sm text-gray-400 transition hover:text-gray-700"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;

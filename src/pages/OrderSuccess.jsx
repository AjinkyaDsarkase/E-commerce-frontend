import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle, FiPackage, FiShoppingBag, FiArrowRight } from "react-icons/fi";

function OrderSuccess() {
  const { state } = useLocation();
  const orderId = state?.orderId;

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="animate-scale-in w-full max-w-md text-center">
        <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/60">
          {/* Success icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <FiCheckCircle size={40} className="text-emerald-500" />
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-900">Order Confirmed!</h1>
          <p className="mt-2 text-gray-500">
            Thank you for your purchase. We'll get it shipped right away.
          </p>

          {orderId && (
            <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Order ID
              </p>
              <p className="mt-0.5 font-black text-gray-900">#{orderId}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            {orderId && (
              <Link
                to={`/orders/${orderId}`}
                className="group flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-bold text-white transition hover:bg-gray-700 active:scale-95"
              >
                <FiPackage size={15} />
                View Order Details
                <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <Link
              to="/orders"
              className="rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              All Orders
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-400 transition hover:text-gray-700"
            >
              <FiShoppingBag size={14} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;

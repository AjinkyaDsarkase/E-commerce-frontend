import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPackage, FiArrowRight, FiChevronRight } from "react-icons/fi";

function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="animate-fade-up text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <FiPackage size={32} className="text-gray-300" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-gray-900">No orders yet</h1>
          <p className="mt-2 text-gray-500">Your order history will appear here.</p>
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
      <div className="mx-auto max-w-4xl animate-fade-up">
        <h1 className="text-3xl font-black text-gray-900">
          My Orders
          <span className="ml-2 text-lg font-semibold text-gray-400">({orders.length})</span>
        </h1>

        <ul className="mt-8 space-y-3">
          {[...orders].reverse().map((order, i) => (
            <li key={order.id}>
              <Link
                to={`/orders/${order.id}`}
                className={`animate-fade-up stagger-${Math.min(i + 1, 4)} group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-gray-900 group-hover:text-white">
                    <FiPackage size={20} className="text-gray-600 transition group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-400">{order.date}</p>
                    <p className="text-sm text-gray-400">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900">${order.total.toFixed(2)}</p>
                    <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                      {order.status}
                    </span>
                  </div>
                  <FiChevronRight size={18} className="text-gray-300 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Orders;

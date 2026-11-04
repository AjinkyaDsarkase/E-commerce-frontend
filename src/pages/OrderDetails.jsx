import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiMapPin } from "react-icons/fi";

function OrderDetails() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.orders);
  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <FiPackage size={40} className="mx-auto text-gray-300" />
          <p className="mt-4 text-gray-500">Order not found.</p>
          <Link to="/orders" className="mt-3 inline-block text-sm font-semibold text-gray-900 hover:underline">
            ← Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl animate-fade-up">
        <Link
          to="/orders"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900"
        >
          <FiArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Order #{order.id}</h1>
            <p className="mt-0.5 text-sm text-gray-400">Placed on {order.date}</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-700">
            {order.status}
          </span>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Items */}
          <section className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-black text-gray-900">
              <FiPackage size={16} className="text-gray-400" />
              Items Ordered
            </h2>
            <ul className="mt-4 divide-y divide-gray-50">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="shrink-0 text-sm font-black text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-4">
              <span className="font-black text-gray-900">Total</span>
              <span className="text-lg font-black text-gray-900">${order.total.toFixed(2)}</span>
            </div>
          </section>

          {/* Shipping */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-black text-gray-900">
              <FiMapPin size={16} className="text-gray-400" />
              Shipping Address
            </h2>
            <div className="mt-4 space-y-1.5 text-sm">
              <p className="font-bold text-gray-900">{order.shippingAddress.fullName}</p>
              <p className="text-gray-500">{order.shippingAddress.address}</p>
              <p className="text-gray-500">
                {order.shippingAddress.city}, {order.shippingAddress.zip}
              </p>
              <p className="text-gray-500">{order.shippingAddress.email}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;

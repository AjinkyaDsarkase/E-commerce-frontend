import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiPackage, FiHeart, FiLogOut, FiLogIn, FiArrowRight, FiChevronRight } from "react-icons/fi";
import { logoutUser } from "../features/auth/authSlice";
import { clearWishlist } from "../features/wishlist/wishlistSlice";
import { clearCart } from "../features/cart/cartSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.orders);
  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);

  function handleLogout() {
    dispatch(logoutUser());
    dispatch(clearWishlist());
    dispatch(clearCart());
    navigate("/");
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="animate-scale-in w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/60">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <FiLogIn size={24} className="text-gray-500" />
          </div>
          <h1 className="mt-4 text-xl font-black text-gray-900">Sign in to continue</h1>
          <p className="mt-2 text-sm text-gray-500">View your profile, orders, and wishlist.</p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition hover:bg-gray-700"
            >
              <FiLogIn size={15} /> Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl animate-fade-up space-y-5">
        {/* User Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white shadow-lg">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl font-black text-white backdrop-blur-sm ring-2 ring-white/20">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-black">{user.name}</h1>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            >
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { to: "/orders", icon: <FiPackage size={22} />, count: orders.length, label: "Orders", color: "bg-blue-50 text-blue-600" },
            { to: "/wishlist", icon: <FiHeart size={22} />, count: wishlistCount, label: "Wishlist", color: "bg-rose-50 text-rose-500" },
          ].map(({ to, icon, count, label, color }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
              <div className="flex-1">
                <p className="text-2xl font-black text-gray-900">{count}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
              <FiChevronRight size={16} className="text-gray-300 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-gray-900">Recent Orders</h2>
            <Link
              to="/orders"
              className="group flex items-center gap-1 text-sm font-semibold text-gray-500 transition hover:text-gray-900"
            >
              View All
              <FiArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="mt-6 flex flex-col items-center py-4 text-center">
              <FiPackage size={32} className="text-gray-200" />
              <p className="mt-3 text-sm text-gray-400">No orders yet.</p>
              <Link
                to="/products"
                className="mt-3 text-sm font-semibold text-gray-900 hover:underline"
              >
                Start shopping →
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              {orders.slice(-3).reverse().map((order) => (
                <li key={order.id}>
                  <Link
                    to={`/orders/${order.id}`}
                    className="group flex items-center justify-between rounded-xl border border-gray-50 bg-gray-50 p-3.5 transition hover:border-gray-200 hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                        <FiPackage size={16} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Order #{order.id}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-900">${order.total.toFixed(2)}</p>
                        <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          {order.status}
                        </span>
                      </div>
                      <FiChevronRight size={14} className="text-gray-300 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default Profile;

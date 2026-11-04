import { NavLink, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "./Navbar";

function Header() {
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );
  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-1.5 text-xl font-black tracking-tight text-gray-900 transition-opacity hover:opacity-80"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-xs font-black text-white transition-transform group-hover:rotate-6">
            S
          </span>
          ShopEasy
        </NavLink>

        <Navbar />

        {/* Global Search */}
        <GlobalSearch />

        {/* Actions */}
        <nav aria-label="User actions">
          <ul className="flex items-center gap-1">
            {[
              {
                to: "/wishlist",
                label: "Wishlist",
                icon: <FiHeart size={19} />,
                count: wishlistCount,
                badgeColor: "bg-rose-500",
              },
              {
                to: "/cart",
                label: "Cart",
                icon: <FiShoppingCart size={19} />,
                count: cartCount,
                badgeColor: "bg-gray-900",
              },
              {
                to: "/profile",
                label: "Profile",
                icon: <FiUser size={19} />,
                count: 0,
                badgeColor: "",
              },
            ].map(({ to, label, icon, count, badgeColor }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  aria-label={label}
                  className={({ isActive }) =>
                    `relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  {icon}
                  {count > 0 && (
                    <span
                      className={`animate-bounce-in absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full ${badgeColor} text-[9px] font-bold text-white ring-2 ring-white`}
                    >
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function GlobalSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="hidden sm:flex items-center">
      <div className="relative">
        <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-52 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100 focus:w-64"
        />
      </div>
    </form>
  );
}

export default Header;

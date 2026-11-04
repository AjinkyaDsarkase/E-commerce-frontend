import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-xs font-black text-white">
              S
            </span>
            <span className="text-lg font-black text-gray-900">ShopEasy</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/cart", label: "Cart" },
              { to: "/wishlist", label: "Wishlist" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <p className="flex items-center justify-center gap-1.5 text-sm text-gray-400">
            © 2026 ShopEasy. Made with
            <FiHeart size={13} className="fill-rose-400 stroke-rose-400" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

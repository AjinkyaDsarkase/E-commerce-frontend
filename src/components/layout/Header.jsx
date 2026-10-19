import { NavLink } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

import Navbar from "./Navbar";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          ShopEasy
        </NavLink>
        {/* Main Navigation */}
        <Navbar />

        {/* Actions */}
        <nav aria-label="User actions">
          <ul className="flex items-center gap-4">
            <li>
              <NavLink to="/wishlist" aria-label="Wishlist">
                <FiHeart size={20} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" aria-label="Shopping cart">
                <FiShoppingCart size={20} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" aria-label="Profile">
                <FiUser size={20} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

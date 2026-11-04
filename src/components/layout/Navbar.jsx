import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {[
          { to: "/", label: "Home" },
          { to: "/products", label: "Products" },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  isActive
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

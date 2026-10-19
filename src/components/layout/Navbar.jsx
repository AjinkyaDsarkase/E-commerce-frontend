import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-6">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/products'>Products</NavLink>
      <NavLink to='/wishlist'>Wishlist</NavLink>
      <NavLink to='/cart'>Cart</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </nav>
  )
}

export default Navbar

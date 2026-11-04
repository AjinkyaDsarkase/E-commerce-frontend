import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart, FiHeart, FiArrowRight } from "react-icons/fi";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  if (wishlistItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="animate-fade-up text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
            <FiHeart size={32} className="text-rose-300" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-gray-900">Your wishlist is empty</h1>
          <p className="mt-2 text-gray-500">Save items you love to your wishlist.</p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Browse Products <FiArrowRight size={15} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-fade-up">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-gray-900">Wishlist</h1>
          <span className="rounded-full bg-rose-100 px-3 py-0.5 text-sm font-bold text-rose-600">
            {wishlistItems.length}
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item, i) => (
            <article
              key={item.id}
              className={`animate-fade-up stagger-${Math.min(i + 1, 4)} group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {item.category}
                </p>
                <h2 className="mt-1 line-clamp-2 flex-1 text-sm font-semibold text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-lg font-black text-gray-900">${item.price.toFixed(2)}</p>

                <button
                  type="button"
                  onClick={() => {
                    dispatch(addToCart({ ...item, quantity: 1 }));
                    dispatch(removeFromWishlist(item.id));
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
                >
                  <FiShoppingCart size={14} />
                  Move to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Wishlist;

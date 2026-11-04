import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { useAuthAction } from "../../hooks/useAuthAction";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const authAction = useAuthAction();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-200">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => authAction(() => dispatch(toggleWishlist(product)))}
          aria-label={`${isWishlisted ? "Remove from" : "Add to"} wishlist`}
          className={`absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${
            isWishlisted
              ? "bg-rose-50 text-rose-500"
              : "bg-white/90 text-gray-400 hover:text-rose-500"
          }`}
        >
          <FiHeart size={15} className={isWishlisted ? "fill-rose-500 stroke-rose-500" : ""} />
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-gray-900/80 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={() => authAction(() => dispatch(addToCart({ ...product, quantity: 1 })))}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white py-2 text-xs font-semibold text-gray-900 transition hover:bg-gray-100 active:scale-95"
          >
            <FiShoppingCart size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {product.category}
        </p>

        <h3 className="mt-1.5 line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-gray-900">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <FiStar size={12} className="fill-amber-400 stroke-amber-400" />
            <span className="text-xs font-semibold text-gray-700">
              {product.rating?.rate ?? "N/A"}
            </span>
          </div>
          <span className="text-xs text-gray-400">({product.rating?.count ?? 0})</span>
        </div>

        <div className="mt-auto pt-3">
          <p className="text-lg font-black text-gray-900">${product.price.toFixed(2)}</p>

          <div className="mt-3 flex gap-2">
            <Link
              to={`/products/${product.id}`}
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-center text-xs font-semibold text-gray-700 transition-all duration-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              View Details
            </Link>

            <button
              type="button"
              onClick={() => authAction(() => dispatch(addToCart({ ...product, quantity: 1 })))}
              aria-label={`Add ${product.title} to cart`}
              className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-900 px-3 py-2 text-white transition-all duration-200 hover:bg-gray-700 active:scale-95"
            >
              <FiShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

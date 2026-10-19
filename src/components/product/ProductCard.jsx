import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute right-3 top-3 rounded-full cursor-pointer bg-white p-2 shadow-sm transition hover:bg-gray-100"
        >
          <FiHeart size={18} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5">
        <p className="text-sm capitalize text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-2 line-clamp-2 min-h-14 text-base font-semibold text-gray-900">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FiStar
              size={16}
              className="fill-current"
            />

            <span className="text-sm font-medium">
              {product.rating?.rate ?? "N/A"}
            </span>
          </div>

          <span className="text-sm text-gray-500">
            ({product.rating?.count ?? 0})
          </span>
        </div>

        {/* Price */}
        <p className="mt-4 text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-center text-sm cursor-pointer font-medium transition hover:bg-gray-100"
          >
            View Details
          </Link>

          <button
            type="button"
            aria-label={`Add ${product.title} to cart`}
            className="rounded-md bg-black px-4 py-2.5 text-white transition hover:bg-gray-800 cursor-pointer"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
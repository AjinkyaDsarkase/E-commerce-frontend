import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { fetchProductById } from "../features/product/productSlice";
import { useAuthAction } from "../hooks/useAuthAction";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isWishlisted = wishlistItems.some((item) => item.id === selectedProduct?.id);
  const authAction = useAuthAction();

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <main>
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>Error: {error}</p>
      </main>
    );
  }

  if (!selectedProduct) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center rounded-lg bg-gray-50 p-6">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="h-72 w-full object-contain sm:h-96"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm capitalize text-gray-500">{selectedProduct.category}</p>

            <h1 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              {selectedProduct.title}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800">
                ★ {selectedProduct.rating?.rate ?? "N/A"}
              </span>
              <span className="text-sm text-gray-500">
                ({selectedProduct.rating?.count ?? 0} reviews)
              </span>
            </div>

            <p className="mt-5 text-2xl font-bold text-gray-900">
              ${selectedProduct.price.toFixed(2)}
            </p>

            <div className="mt-6">
              <h2 className="mb-2 text-base font-semibold text-gray-900">Product Description</h2>
              <p className="text-sm leading-6 text-gray-600">{selectedProduct.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="mb-3 block text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex w-fit items-center rounded-lg border border-gray-300">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                  className="px-4 py-2.5 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>
                <span className="min-w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  aria-label="Increase quantity"
                  className="px-4 py-2.5 text-lg transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => authAction(() => dispatch(addToCart({ ...selectedProduct, quantity })))}
                className="flex-1 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => authAction(() => dispatch(toggleWishlist(selectedProduct)))}
                aria-label="Toggle wishlist"
                className="rounded-lg border border-gray-300 px-4 py-3 transition hover:bg-gray-100"
              >
                <FiHeart
                  size={18}
                  className={isWishlisted ? "fill-red-500 stroke-red-500" : ""}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;

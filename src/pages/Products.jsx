import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts, fetchCategories } from "../store/slices/productSlice";

import ProductGrid from "../components/product/ProductGrid";

function Products() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const {
    products,
    loading,
    error,
    categories,
    categoriesLoading,
    categoriesError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts];

  if (sortBy === "price-low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    sortedProducts.sort(
      (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0),
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p role="status" className="py-10 text-center text-gray-500">
          Loading products...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p role="alert" className="py-6 text-red-600">
          Failed to load products: {error}
        </p>
        <button
          type="button"
          onClick={() => dispatch(fetchProducts())}
          className="rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <section aria-labelledby="products-heading">
        <h1 id="products-heading" className="text-3xl font-bold text-gray-900">
          All Products
        </h1>

        <p className="mt-2 text-gray-600">
          Discover products for your everyday needs.
        </p>

        {/* Category filters */}
        <div className="my-8">
          <h2 className="mb-3 text-lg font-semibold">Shop by Category</h2>

          {categoriesLoading ? (
            <p role="status" className="text-sm text-gray-500">
              Loading categories...
            </p>
          ) : categoriesError ? (
            <p role="alert" className="text-sm text-red-600">
              Could not load categories: {categoriesError}
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                aria-pressed={selectedCategory === "all"}
                className={`rounded-full border px-4 py-2 text-sm capitalize transition cursor-pointer ${
                  selectedCategory === "all"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full border px-4 py-2 text-sm capitalize transition cursor-pointer ${
                    selectedCategory === category
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing {sortedProducts.length} products
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-products"
              className="text-sm font-medium text-gray-700"
            >
              Sort by:
            </label>

            <select
              id="sort-products"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product results */}
        {/* <div className="mb-5">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </p>
        </div> */}

        <ProductGrid products={sortedProducts} />
      </section>
    </main>
  );
}

export default Products;

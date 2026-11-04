import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchProducts, fetchCategories } from "../features/product/productSlice";

import ProductGrid from "../components/product/ProductGrid";

function Products() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ?? "all");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm] = useState(searchParams.get("q") ?? "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const priceFilteredProducts = searchedProducts.filter((product) => {
    const meetsMinPrice = minPrice === "" || product.price >= Number(minPrice);
    const meetsMaxPrice = maxPrice === "" || product.price <= Number(maxPrice);
    return meetsMinPrice && meetsMaxPrice;
  })

  const sortedProducts = [...priceFilteredProducts];

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
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
            <p role="status" className="text-sm text-gray-500">Loading products...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <div className="mt-10 rounded-xl border border-red-100 bg-red-50 p-6">
            <p role="alert" className="text-sm text-red-600">Failed to load products: {error}</p>
            <button
              type="button"
              onClick={() => dispatch(fetchProducts())}
              className="mt-4 rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  
return (
  <main className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section aria-labelledby="products-heading">

        {/* Page heading */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1
            id="products-heading"
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            All Products
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Discover products for your everyday needs.
          </p>
        </div>

        {/* Price filter */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Filter by Price</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="min-price" className="mb-1.5 block text-sm font-medium text-gray-700">
                Minimum Price ($)
              </label>
              <input type="number" id="min-price" min="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="e.g 20" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100" />
            </div>
            <div>
              <label htmlFor="max-price" className="mb-1.5 block text-sm font-medium text-gray-700">
                Maximum Price ($)
              </label>
              <input type="number" id="max-price" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g 500" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100" />
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Shop by Category
          </h2>

          {categoriesLoading ? (
            <p role="status" className="text-sm text-gray-500">Loading categories...</p>
          ) : categoriesError ? (
            <p role="alert" className="text-sm text-red-500">Could not load categories: {categoriesError}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                aria-pressed={selectedCategory === "all"}
                className={`rounded-full border px-5 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "border-gray-900 bg-gray-900 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                All Products
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full border px-5 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                    selectedCategory === category
                      ? "border-gray-900 bg-gray-900 text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product count and sorting */}
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Our Products</h2>
            <p className="text-sm text-gray-400">
              Showing <span className="font-medium text-gray-700">{sortedProducts.length}</span> results
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-products"
              className="text-sm font-medium text-gray-600"
            >
              Sort by
            </label>
            <select
              id="sort-products"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product results */}
        <ProductGrid products={sortedProducts} />

      </section>
    </div>
  </main>
);

}

export default Products;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { categories } from "../data/categories";
import { fetchProducts } from "../store/slices/productSlice";
import ProductGrid from "../components/product/ProductGrid";

function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <section className="bg-gray-100">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center px-4 py-16">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600">
              Welcome to ShopEasy
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Discover products you will love
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Explore our collection of quality products at great prices and
              find something perfect for you.
            </p>

            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center rounded-md bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* shop by category */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>

            <p className="mt-2 text-gray-600">
              Explore our products by category.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.name}
                className="rounded-lg border border-gray-200 p-6 transition hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-3 text-gray-600">{category.description}</p>

                <Link
                  to={`/products?category=${category.name}`}
                  className="mt-5 inline-block font-medium text-gray-900 hover:underline"
                >
                  Explore →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* featured products */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>

              <p className="mt-2 text-gray-600">
                Check out some of our popular products.
              </p>
            </div>

            <Link
              to="/products"
              className="font-medium text-gray-900 hover:underline"
            >
              View All
            </Link>
          </div>

          {loading && <p className="text-gray-600">Loading products...</p>}

          {error && <p className="text-red-600">Failed to load products.</p>}

          {!loading && !error && <ProductGrid products={featuredProducts} />}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl bg-gray-900 px-6 py-12 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Special Offers Just for You
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              Discover great products and exciting deals. Find your next
              favorite product at a price you'll love.
            </p>

            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center rounded-md bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-100"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { fetchProducts, fetchCategories } from "../features/product/productSlice";
import ProductGrid from "../components/product/ProductGrid";

const perks = [
  { icon: <FiTruck size={20} />, title: "Free Shipping", desc: "On orders over $50" },
  { icon: <FiShield size={20} />, title: "Secure Payment", desc: "100% protected" },
  { icon: <FiRefreshCw size={20} />, title: "Easy Returns", desc: "30-day return policy" },
  { icon: <FiShoppingBag size={20} />, title: "Best Prices", desc: "Guaranteed lowest" },
];

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, categories } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, products.length, categories.length]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-center px-4 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              New arrivals every week
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Discover
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.3)]">
                products
              </span>{" "}
              <br />
              you'll love
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-300">
              Explore our curated collection of quality products at unbeatable prices.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-lg transition-all duration-200 hover:shadow-white/20 hover:scale-105 active:scale-95"
              >
                Shop Now
                <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Perks bar */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {perks.map((perk, i) => (
              <div
                key={perk.title}
                className={`animate-fade-up stagger-${i + 1} flex items-center gap-3`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                  {perk.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{perk.title}</p>
                  <p className="text-xs text-gray-500">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Explore</p>
              <h2 className="mt-1 text-3xl font-black text-gray-900 sm:text-4xl">
                Shop by Category
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className={`animate-fade-up stagger-${i + 1} group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg`}
              >
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white">
                  <FiArrowRight size={14} />
                </div>
                <h3 className="text-lg font-bold capitalize text-gray-900">{category}</h3>
                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-gray-400 transition-colors group-hover:text-gray-900">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Handpicked</p>
              <h2 className="mt-1 text-3xl font-black text-gray-900 sm:text-4xl">
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="group hidden items-center gap-1.5 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900 sm:flex"
            >
              View All
              <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-white p-4">
                  <div className="aspect-square rounded-xl bg-gray-200" />
                  <div className="mt-4 h-3 w-2/3 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-full rounded bg-gray-200" />
                  <div className="mt-4 h-6 w-1/3 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-red-500">Failed to load products.</p>}

          {!loading && !error && <ProductGrid products={featuredProducts} />}

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            >
              View All Products <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-16 text-center">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white/70">
                Limited Time
              </span>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
                Special Offers Just for You
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Discover great products and exciting deals. Find your next favorite at a price you'll love.
              </p>
              <Link
                to="/products"
                className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Explore Products
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

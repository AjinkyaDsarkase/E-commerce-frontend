import { Link } from "react-router-dom"
function Home() {
  return (
    <>
    <section aria-labelledby='hero-heading'>
      <header>
        <p>Welocme to our store</p>

        <h1 id='hero-heading'>
          Discover products you will love
        </h1>

        <p>
          Explore our collection of quality products at great prices.
        </p>
        <Link to="/products">Shop Now</Link>
      </header>
    </section>

    <section aria-labelledby='categories-heading'>
      <header>
        <h2 id='categories-heading'>Shop by Category</h2>
      </header>

      <div>
        <article>
          <h3>Electronics</h3>
          <p>Explore the latest electronic products.</p>
        </article>

        <article>
          <h3>Fashion</h3>
          <p>Discover clothing and fashion products.</p>
        </article>

        <article>
          <h3>Shoes</h3>
          <p>Find shoes for every occasion.</p>
        </article>

        <article>
          <h3>Accessories</h3>
          <p>Discover clothing and fashion products.</p>
        </article>
      </div>
    </section>

    <section aria-labelledby='featured-heading'>
      <header>
        <h2 id='featured-heading'>Featured Products</h2>
      </header>

      <p>Featured products will appear here.</p>
    </section>

    <section aria-labelledby='promotion-heading'>
      <header>
        <h2 id='promotion-heading'>Special Offers</h2>
      </header>

      <p>Check out or latest deals and offers.</p>

      <Link to="/products">Explore Products</Link>
    </section>
    </>
  )
}

export default Home

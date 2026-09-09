import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <nav>
          <a href="/">E-Commerce App</a>
        </nav>
      </header>

      <main>
        <section>
          <h1>E-commerce App</h1>
          <p>Welcome to our online store.</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 E-commerce App. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App

import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'

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
       <AppRoutes />
      </main>

      <footer>
        <p>&copy; 2026 E-commerce App. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App

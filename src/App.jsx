import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />

      <main>
       <AppRoutes />
      </main>

      <Footer />
    </>
  )
}

export default App

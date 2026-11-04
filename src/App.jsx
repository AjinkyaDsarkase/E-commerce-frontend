import AppRoutes from './routes/AppRoutes'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

function App() {

  return (
    <>
      <Header />

      <main>
       <AppRoutes />
       {/* <ProductTest /> */}
      </main>

      <Footer />
    </>
  )
}

export default App

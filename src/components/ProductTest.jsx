import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../store/slices/productSlice";

function ProductTest() {

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch])

  console.log("Products : ", products);

  if(loading){
    return <p>Loading products...</p>
  }

  if(error){
    return <p>Error : {error}</p>
  }

  return (
    <section>
      <h2>Products</h2>

      <p>Total Products : {products.length}</p>

      {
        products.map((product) => {
          return (
          <article key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </article>
        )})
      }
    </section>
  )
}

export default ProductTest

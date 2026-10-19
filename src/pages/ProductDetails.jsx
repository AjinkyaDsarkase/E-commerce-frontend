import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductById } from "../store/slices/productSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <main>
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>Error: {error}</p>
      </main>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  return (
    <main>
      <h1>{selectedProduct.title}</h1>

      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
      />

      <p>${selectedProduct.price}</p>

      <p>{selectedProduct.description}</p>
    </main>
  );
}

export default ProductDetails;
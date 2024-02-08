import { useState, useEffect } from 'react';

import Product from './Product';
import AddProduct from './AddProduct';
import Error from './Error';

import api from '../api/api';

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        setErr('Failed to fetch products');
      }
    })();
  }, []);

  const renderedProducts = products.map((product) => {
    return (
      <Product
        key={product._id}
        {...product}
        setProducts={setProducts}
        products={products}
        cart={cart}
        setCart={setCart}
      />
    );
  });

  return (
    <div className="product-listing">
      <h2>Products</h2>
      {err ? (
        <Error err={err} />
      ) : (
        <ul className="product-list">{renderedProducts}</ul>
      )}
      <AddProduct products={products} setProducts={setProducts} />
    </div>
  );
};

export default Products;

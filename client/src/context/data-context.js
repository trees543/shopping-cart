import { createContext, useState, useEffect } from 'react';

import api from '../api/api.js';

const DataContext = createContext();

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsErr, setProductsErr] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartErr, setcartErr] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, err } = await api.getProducts();
      if (err) setProductsErr(err);
      else setProducts(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, err } = await api.getCart();
      if (err) setcartErr(err);
      else setCart(data);
    })();
  }, []);

  const contextItems = {
    products,
    addProduct: (newVal) => {
      api
        .addProduct(newVal)
        .then((data) => setProducts([...products, data]))
        .catch((error) => console.error('Error adding product', error));
    },
    removeProduct: (id) => {
      api
        .deleteProduct(id)
        .then(() => setProducts(products.filter((item) => item._id !== id)))
        .catch((error) => console.error('Error deleting product', error));
    },
    updateProduct: (id, newVal) => {
      api
        .updateProduct(id, newVal)
        .then((data) =>
          setProducts(products.map((item) => (item._id === id ? data : item)))
        )
        .catch((error) => console.error('Error updating product', error));
    },
    cart,
    checkout: () => {
      api
        .checkout()
        .then(() => setCart([]))
        .catch((error) => console.error('Error checking out', error));
    },
    addToCart: (id) => {
      api
        .addToCart(id)
        .then((data) => {
          contextItems.getCart();
          return data;
        })
        .then((data) =>
          setProducts(
            products.map((product) =>
              product._id === id ? data.product : product
            )
          )
        )
        .catch((error) => console.error('Error adding to cart', error));
    },
    getCart: () => {
      api
        .getCart()
        .then((data) => setCart(data))
        .catch((error) => console.error('Error fetching cart', error));
    },
  };

  return (
    <DataContext.Provider value={contextItems}>{children}</DataContext.Provider>
  );
}

export { Provider };
export default DataContext;

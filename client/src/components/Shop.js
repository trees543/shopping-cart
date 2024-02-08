import { useState, useEffect } from 'react';

import Header from './Header';
import Products from './Products';

const Shop = () => {
  const [cart, setCart] = useState([]);

  return (
    <main className="main">
      <Header cart={cart} setCart={setCart} />
      <Products cart={cart} setCart={setCart} />
    </main>
  );
};

export default Shop;

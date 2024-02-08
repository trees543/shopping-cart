import { useEffect, useState } from 'react';
import CartItem from './CartItem.js';

import Error from './Error.js';

import api from '../api/api.js';

const Cart = ({ cart, setCart }) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getCart();
        setCart(data);
      } catch (err) {
        setErr('Failed to fetch cart');
      }
    })();
  }, []);

  const renderedCart = cart.map((item) => {
    return (
      <CartItem
        key={item._id}
        item={item.title}
        quantity={item.quantity}
        price={item.price}
      />
    );
  });

  const totalCart = cart.reduce(
    (acc, val) => acc + val.price * val.quantity,
    0
  );

  return (
    <div className="cart">
      {err && <Error err={err} />}
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>{renderedCart}</tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total">
              {totalCart}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button
          className="checkout"
          onClick={() => {
            api
              .checkout()
              .then(() => setCart([]))
              .catch((err) => setErr(err));
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

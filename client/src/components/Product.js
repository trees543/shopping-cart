import { useState } from 'react';

import useData from '../hooks/useData.js';
import EditForm from './EditForm.js';

import api from '../api/api.js';

const Product = (props) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showNotification, setShowNotification] = useState('');
  const [err, setErr] = useState(null);

  const { _id, title, price, quantity, setProducts, products, cart, setCart } =
    props;

  const handleAddToCart = () => {
    if (quantity === 0) return alert('Out of stock');
    api
      .addToCart(_id)
      .then((data) => {
        setProducts(
          products.map((item) => (item._id === _id ? data.product : item))
        );
      })
      .then(() => {
        api.getCart().then((data) => setCart(data));
        setShowNotification('Item added to cart');
        setTimeout(() => {
          setShowNotification('');
        }, 1000);
      })
      .catch((err) => {
        setErr('Failed to add item to cart');
      });
  };

  return (
    <li className="product">
      {err}
      {err && <Error err={err} />}
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity}</p>
        <div className="actions product-actions">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to cart
          </button>
          <button
            className="edit"
            onClick={() => setShowEditForm(!showEditForm)}
          >
            Edit
          </button>
          {showEditForm && (
            <EditForm
              {...props}
              setShowEditForm={setShowEditForm}
              setProducts={setProducts}
              products={products}
            />
          )}
        </div>
        <button
          className="delete-button"
          onClick={() =>
            api
              .deleteProduct(_id)
              .then(() =>
                setProducts(products.filter((item) => item._id !== _id))
              )
              .catch((err) => setErr('Failed to delete product'))
          }
        >
          <span>X</span>
        </button>
      </div>
    </li>
  );
};

export default Product;

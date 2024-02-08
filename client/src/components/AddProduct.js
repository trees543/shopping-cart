import { useState } from 'react';

import Error from './Error';

import useFormm from '../hooks/useFormm';

import api from '../api/api';

const AddProduct = ({ setProducts }) => {
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState('');
  const [err, setErr] = useState(null);

  const { register, handleSubmit, errors, values, reset } = useFormm();

  const generateNewProduct = () => {
    console.log(values.price);
    return {
      title: values.title,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity),
    };
  };

  const onSubmit = (e) => {
    const newProduct = generateNewProduct();
    api
      .addProduct(newProduct)
      .then((data) => {
        setProducts((prev) => [...prev, data]);
        setShowNotification('Product added successfully');
        reset();
        setShowForm(false);
      })
      .catch((err) => {
        setErr('Failed to add product');
      });
  };

  return (
    <div className="add-form">
      {err && <Error err={err} />}
      <p>
        <button
          className="add-product-button"
          onClick={() => setShowForm(!showForm)}
        >
          Add a Product
        </button>
      </p>
      {showForm && (
        <div>
          <h3>Add Product</h3>
          <form>
            <div className="input-group">
              <label htmlFor="product-name">Product Name:</label>
              <input
                {...register('title', { required: true, length: 2 })}
                id="product-name"
                required
              />
              <div>{errors.title}</div>
            </div>
            <div className="input-group">
              <label htmlFor="product-price">Product Price:</label>
              <input
                {...register('price', {
                  required: true,
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: 'Invalid price format. Use 0.00 format.',
                })}
                id="product-price"
                required
              />
              <div>{errors.price}</div>
            </div>
            <div className="input-group">
              <label htmlFor="product-name">Product Quantity:</label>
              <input
                {...register('quantity', {
                  required: true,
                  pattern: /^[1-9]\d*$/,
                  message: 'Quantity must be a positive number.',
                })}
                id="product-quantity"
                required
              />
              <div>{errors.quantity}</div>
            </div>
            <div className="actions form-actions">
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

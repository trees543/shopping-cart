import { useState } from 'react';

import useFormm from '../hooks/useFormm';

import Error from './Error';

import api from '../api/api';

const EditForm = ({
  _id,
  title,
  quantity,
  price,
  setShowEditForm,
  setProducts,
  products,
}) => {
  const [err, setErr] = useState(null);

  const { register, handleSubmit, errors, values, reset } = useFormm({
    title,
    quantity: quantity.toString(),
    price: price.toString(),
  });

  const assembleUpdateData = () => {
    const updateData = {
      title: values.title,
      quantity: parseInt(values.quantity),
      price: parseFloat(values.price),
    };

    return updateData;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    api
      .updateProduct(_id, { ...assembleUpdateData() })
      .then((data) => {
        setShowEditForm(false);
        setProducts(
          products.map((product) => (product._id === _id ? data : product))
        );
      })
      .catch((err) => {
        setError('Failed to update product');
      });
  };

  const renderedForm = (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            {...register('title', { required: true, length: 2 })}
            id="product-name"
            aria-label="Product Name"
          />
          {errors.title && <div>{errors.title} </div>}
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            {...register('price', {
              required: true,
              pattern: /^\d+(\.\d{1,2})?$/,
              message: 'Invalid price',
            })}
            id="product-price"
            aria-label="Product Price"
          />
          {errors.price && <div>{errors.price} </div>}
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            {...register('quantity', {
              required: true,
              pattern: /^[1-9]\d*$/,
              message: 'Quantity must be a positive number.',
            })}
            id="product-quantity"
            aria-label="Product Quantity"
          />
          {errors.quantity && <div>{errors.quantity} </div>}
        </div>

        <div className="actions form-actions">
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            Update
          </button>
          <button type="button" onClick={() => setShowEditForm(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {err && <Error err={err} />}
      {renderedForm}
    </div>
  );
};

export default EditForm;

import axios from 'axios';

const BASE = 'http://localhost:5001/api/';

const getProducts = async () => {
  const { data } = await axios.get(`${BASE}products`);
  return data;
};

const addProduct = async (product) => {
  const { data } = await axios.post(`${BASE}products`, product);
  return data;
};

const updateProduct = async (productId, updatedProduct) => {
  const { data } = await axios.put(
    `${BASE}products/${productId}`,
    updatedProduct
  );
  return data;
};

export const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`${BASE}products/${productId}`);
  return data;
};

export const checkout = async () => {
  const { data } = await axios.post(`${BASE}checkout`);
  return data;
};

export const getCart = async () => {
  const { data } = await axios.get(`${BASE}cart`);
  console.log(data);
  return data;
};

export const addToCart = async (productId) => {
  const { data } = await axios.post(`${BASE}add-to-cart`, { productId });
  return data;
};

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  checkout,
  getCart,
  addToCart,
};

const CartItem = ({ item, quantity, price }) => {
  return (
    <tr>
      <td>{item}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </tr>
  );
};

export default CartItem;

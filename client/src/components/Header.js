import Cart from './Cart';

const Header = ({ cart, setCart }) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cart={cart} setCart={setCart} />
    </header>
  );
};

export default Header;

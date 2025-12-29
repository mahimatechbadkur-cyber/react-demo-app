import { CURRENCY } from '../common/constant.js';
import { useCart } from '../context/CardContext.jsx';
import { calculateCartTotals } from '../utils/getDiscount.js';


export const Cart = () => {
  const { cart } = useCart();

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const bestPrice = calculateCartTotals(cart);
  const { subtotal, breakdown ,discount, total} = bestPrice || { price: 0, breakdown: [] };

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <h2>Your Cart has ({itemCount}) items</h2>
          <h2>Total Amount without discount - {subtotal}</h2>
          <h2>Total Amount with discount - {total}</h2>
          <h2>Discounted Amount - {discount}</h2>

          {Array.isArray(breakdown) && breakdown.length > 0 && (
            <div className="discount-breakdown">
              {breakdown.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}

          {cart.map(item => (
            <p key={item.id}>{item.title} x {item.quantity} - {item.price * item.quantity} {CURRENCY}</p>
          ))}
        </>
      ) : 'No items found'}
    </div>
  );
};

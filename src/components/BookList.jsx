import { useCart } from '../context/CardContext.jsx';
import { products } from '../common/constant.js';
import { CURRENCY } from '../common/constant.js';

export const BookList = () => {
  const { addToCart } = useCart();
  return (
    <div>
      {products.map(p => (
        <div key={p.id} className="product-card">
          <h3>{p.title} - {p.price} {CURRENCY}</h3>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

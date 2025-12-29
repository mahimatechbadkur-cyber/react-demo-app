import { useCart } from '../context/CardContext.jsx';

const products = [
  { id: 1,title: 'Clean Code', price: 50 },
  { id: 2, title: 'The Clean Coder', price: 50 },
  { id: 3, title: 'Clean Architecture', price: 50 },
{ id: 4, title: 'Test Driven Development by Example', price: 50 },
  { id: 5, title: 'Working Effectively With Legacy Code', price: 50 },
];

export const BookList = () => {
  const { addToCart } = useCart();
  return (
    <div>
      {products.map(p => (
        <div key={p.id} className="product-card">
          <h3>{p.title} - ${p.price}</h3>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

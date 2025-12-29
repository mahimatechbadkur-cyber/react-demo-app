import React from 'react';
import { BookList } from './components/BookList';
import { Cart } from './components/Cart';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Modern Vite Shop 2025</h1>
      </header>
      
      <main className="main-content">
        <section className="catalog">
          <h2>Our Products</h2>
          {/* This component allows users to trigger the 'Add to Cart' action */}
          <BookList />
        </section>

        <aside className="cart-sidebar">
          {/* This component displays the current state of the cart */}
          <Cart />
        </aside>
      </main>

      <footer>
        <p>© 2025 Shopping Cart Demo. Built with React & Vite.</p>
      </footer>
    </div>
  );
}

export default App;

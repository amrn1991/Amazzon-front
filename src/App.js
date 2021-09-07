import "./App.css";
import data from "./data";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <div className="grid-container">
      <header className="header">
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="close-btn" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="/index.html">Pants</a>
            </li>
            <li>
              <a href="/index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <div className="brand">
          <button onClick={openMenu}>&#8801;</button>
          <a href="/index.html">Amazzon</a>
        </div>
        <div className="header-links">
          <a href="/cart.html">Cart</a>
          <a href="/signin.html">Sign In</a>
        </div>
      </header>
      <main className="main">
        <div className="content">
          <ul className="products">
            {data.products.map((product) => (
              <li key={product.id}>
                <div className="product">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="product-name">
                    <a href="/product.html">{product.name}</a>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">
                    stars ({product.numReviews} Reviews)
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="footer">All Rights Reserved &copy;</footer>
    </div>
  );
}

export default App;

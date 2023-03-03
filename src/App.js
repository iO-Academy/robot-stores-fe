import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import Products from "./components/Products";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*<Route path="/products" element={<Products />} />*/}
      <Route path="/products" element={<Home />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

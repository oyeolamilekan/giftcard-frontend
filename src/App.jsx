import { Routes, Route } from "react-router-dom";
import Brands from "./pages/Brands";
import CheckOut from "./pages/CheckOut";
import Products from "./pages/Products";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Brands />} />
      <Route path="/product/:id" element={<Products />} />
      <Route path="/checkout/:id" element={<CheckOut />} />
    </Routes>
  )
}

export default App

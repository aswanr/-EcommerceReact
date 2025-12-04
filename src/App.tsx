import "./App.css";
import Login from "./pages/Login/LoginForm";
import SignUp from "./pages/Signup/SignupForm";
import HomePage from "./pages/Home/HomePage";
import SingleProduct from "./pages/productbyid/ProductbyId";
import Product from "./pages/products/products";
import SignOut from "./pages/signout/signout";
import CartItem from "./pages/cartitem/cartitem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/protectedroutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/cartitems" element={<CartItem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

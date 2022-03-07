import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import CheckoutScreen from "./components/Screen/CheckoutScreen";
import LoginScreen from "./components/Screen/LoginScreen";
import PlaceOrder from "./components/Screen/PlaceOrder";
import ProductDetailsScreen from "./components/Screen/ProductDetailsScreen";
import ProfileScreen from "./components/Screen/ProfileScreen";
import ShippingScreen from "./components/Screen/ShippingScreen";
import SignUpScreen from "./components/Screen/SignUpScreen";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="category" element={<Home />}>
            <Route path=":category" element={<Home />} />
          </Route>

          <Route path="page" element={<Home />}>
            <Route path=":page" element={<Home />} />
          </Route>

          <Route path="category" element={<Home />}>
            <Route path=":category" element={<Home />}>
              <Route path="page" element={<Home />}>
                <Route path=":page" element={<Home />} />
              </Route>
            </Route>
          </Route>

          <Route path="/search" element={<Home />}>
            <Route path=":search" element={<Home />}>
              <Route path="page" element={<Home />}>
                <Route path=":page" element={<Home />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/product/:id" element={<ProductDetailsScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="checkout" element={<CheckoutScreen />} />
          <Route path="shipping" element={<ShippingScreen />} />
          <Route path="placeorder" element={<PlaceOrder />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

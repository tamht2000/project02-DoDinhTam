import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/page/HomePage";
import LoginPage from "./components/page/LoginPage";
import AboutPage from "./components/page/AboutPage";
import ContactPage from "./components/page/ContactPage";
import { Route, Routes } from "react-router-dom";
import Products from "./components/page/Products";
import RegisterPage from "./components/page/RegisterPage";
import Admin from "./components/admin/Admin";
import ProductDetail from "./components/page/ProductDetail";
import Dashboard from "./components/admin/components/Dashboard/Dashboard";
import ManagerProduct from "./components/admin/components/ManagerProduct/ManagerProduct";
import ManagerUser from "./components/admin/components/ManagerUser/ManagerUser";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<Products />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/manager-product" element={<ManagerProduct />} />
                <Route path="/manager-user" element={<ManagerUser />} />
                <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
        </div>
    );
}

export default App;

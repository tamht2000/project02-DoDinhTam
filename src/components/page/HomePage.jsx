import React, { useEffect, useState } from "react";

import "./Home.css";
import Products from "./Products";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import axios from "axios";

function HomePage() {
    const [user, setUser] = useState({});
    const [cartProduct, setCartProduct] = useState(user.cart || []);
    const [check, setCheck] = useState(false);
    // gọi từ local lấy user người dùng đang hoạt động.
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    // Kiểm tra người dùng đã đăng nhập chưa
    const userId = userLogin ? userLogin.id : null;

    const loadUser = async () => {
        if (userId) {
            let result = await axios.get(
                `http://localhost:8000/users/${userId}`
            );
            const userData = result.data;
            setUser(userData);
            // Đảm bảo rằng bạn không ghi đè lên giỏ hàng cũ khi cập nhật state
            setCartProduct(userData.cart || []);
        }
    };
    useEffect(() => {
        loadUser();
    }, [userId]);
    const handleAppProduct = async (product, toogle) => {
        if (userId) {
            const updatedCart = [...cartProduct]; // sao chép dữ liệu
            const existingProduct = updatedCart.find(
                (item) => item.id === product.id
            );
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                updatedCart.push({ ...product, quantity: 1 });
            }

            // Cập nhật state giỏ hàng của ứng dụng
            setCartProduct(updatedCart);

            // Gọi API để cập nhật giỏ hàng trên máy chủ
            await axios.patch(`http://localhost:8000/users/${userId}`, {
                cart: updatedCart,
            });

            setCheck(!toogle);
            loadUser();
        }
    };

    // logic hiển thị theo loại sản phẩm
    const [selectedProductType, setSelectedProductType] = useState(null);

    const handleSelectType = (type) => {
        setSelectedProductType(type)
    }
    return (
        <div className="home-page">
            <Header check={check} handleSelectType={handleSelectType}/>
            <Products handleAppProduct={handleAppProduct} setCheck={setCheck} check={check} selectedProductType={selectedProductType}/>
            <Footer />
        </div>
    );
}

export default HomePage;

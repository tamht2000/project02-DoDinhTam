import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Products({ handleAppProduct, setCheck, check, selectedProductType }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState([]);
    const url = "http://localhost:8000/products";

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // gọi từ local lấy user người dùng đang hoạt động.
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    // Kiểm tra người dùng đã đăng nhập chưa
    const userId = userLogin ? userLogin.id : null;

    // gọi user người dùng theo id.
    const [user, setUser] = useState({});
    const [cartProduct, setCartProduct] = useState(user.cart || []);
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

    // hàm mua hàng

    const addToCart = async (product) => {
        if(userLogin) {
            handleAppProduct(product, check)
            setCheck(!check)
        } else {
            navigate("/login")
        }
        // user
        //     ? (handleAppProduct(product, check), setCheck(!check))
        //     : navigate("/login");
    };
    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}>Products</h1>

            <div className="card_wrapper">
                {product
                    .filter(
                        (product) =>
                            !selectedProductType ||
                            product.type === selectedProductType
                    )
                    .map((product) => (
                        <div className="card_product">
                            <Card style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title
                                        className="text-name"
                                        onClick={() => {
                                            navigate(`/products/${product.id}`);
                                        }}
                                    >
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text className="text-price">
                                        {product.price} $
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to cart
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Products;

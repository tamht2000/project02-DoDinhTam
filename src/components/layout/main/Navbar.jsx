// Navbar.jsx
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import UserInfoModal from "./UserInforModal";
import axios from "axios";

import Modal from "react-bootstrap/Modal";

function NavScrollExample({ checkt }) {
    let resultUser = JSON.parse(localStorage.getItem("userLogin"));
    const navigate = useNavigate();

    // logout
    const handLogout = () => {
        localStorage.removeItem("userLogin");
        navigate("/login");
    };

    const [showUserInfoModal, setShowUserInfoModal] = useState(false);

    const handleShowUserInfoModal = () => {
        setShowUserInfoModal(true);
    };

    const handleCloseUserInfoModal = () => {
        setShowUserInfoModal(false);
    };

    const handleUpdateUser = (updatedUser) => {
        // Xử lý cập nhật thông tin người dùng tại đây (có thể gọi API hoặc lưu vào localStorage)
        // Sau khi cập nhật xong, bạn có thể cập nhật hiển thị tên người dùng trong Navbar
        // và đóng modal
        // Ví dụ:
        // localStorage.setItem("userLogin", JSON.stringify(updatedUser));
        // setResultUser(updatedUser);
        handleCloseUserInfoModal();
    };

    // Cart
    // Kiểm tra người dùng đã đăng nhập chưa
    const userId = resultUser ? resultUser.id : null;

    // gọi user người dùng theo id.
    const [cartProduct, setCartProduct] = useState([]);
    const [userCart, setUserCart] = useState([]);

    const loadUser = async () => {
        if (userId) {
            let result = await axios.get(
                `http://localhost:8000/users/${userId}`
            );
            const userData = result.data;
            setUserCart(userData);
            // Đảm bảo rằng bạn không ghi đè lên giỏ hàng cũ khi cập nhật state
            setCartProduct(userData.cart || []);
        }
    };
    const cartLength = cartProduct.length;

    useEffect(() => {
        loadUser();
    }, [checkt]);

    // Hiển thị cart của user
    const [showCartModal, setShowCartModal] = useState(false);

    const handleShowCart = () => {
        setShowCartModal(true);
        // Giỏ hàng đã được tải trong useEffect, không cần tải lại ở đây
    };

    const handleIncreaseQuantity = (product) => {
        // Tăng số lượng sản phẩm trong giỏ hàng
        const updatedCart = cartProduct.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCartProduct(updatedCart);
    };

    const handleDecreaseQuantity = (product) => {
        // Giảm số lượng sản phẩm trong giỏ hàng, nếu số lượng là 1 thì xoá sản phẩm
        const updatedCart = cartProduct
            .map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);
        setCartProduct(updatedCart);
    };

    const handleRemoveFromCart = async (product) => {
        // Xoá sản phẩm khỏi giỏ hàng
        const updatedCart = cartProduct.filter(
            (item) => item.id !== product.id
        );
        setCartProduct(updatedCart);
        await axios.patch(`http://localhost:8000/users/${userCart.id}`, {
            cart: updatedCart,
        });
    };

    // đóng modal cart
    const handleCloseCartModal = () => {
        setShowCartModal(false);
    };

    // Search
    // State để lưu trữ kết quả tìm kiếm và quản lý trạng thái modal
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const handleShowSearchModal = () => {
        setShowSearchModal(true);
    };

    const handleCloseSearchModal = () => {
        setShowSearchModal(false);
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/products?q=${searchTerm}`
            );
            setSearchResults(response.data);
            console.log(searchResults);
        } catch (error) {
            console.error("Error searching for products:", error);
        }
    };

    useEffect(() => {
        if (showSearchModal) {
            handleSearch();
        }
    }, [showSearchModal]);

    return (
        <Navbar
            style={{
                padding: "0 10% 0 10%",
                position: "fixed",
                zIndex: "1000",
                width: "100%",
                height: "100",
                margin: "0px",
            }}
            expand="lg"
            bg="dark"
            variant="dark"
            className="bg-body-tertiary text-white"
        >
            <Container fluid>
                <Navbar.Brand href="#">
                    {" "}
                    <img
                        style={{ width: "100px" }}
                        src="/Chef hat with spoon and fork logo design.png"
                        alt=""
                    />{" "}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <NavDropdown
                            title="Products"
                            id="navbarScrollingDropdown"
                        >
                            <NavDropdown.Item href="/product">
                                Meat
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/product">
                                Seafood
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/product">
                                Beverage
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form
                        className="d-flex"
                        style={{ width: "100%", padding: "30px" }}
                    >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                        />
                    </Form>
                    <Button
                        variant="outline-success"
                        onClick={handleShowSearchModal}
                    >
                        Search
                    </Button>
                </Navbar.Collapse>
            </Container>
            <div>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {resultUser !== null ? (
                            <>
                                <Nav.Link
                                    href="#"
                                    onClick={handleShowUserInfoModal}
                                >
                                    {resultUser.name}
                                </Nav.Link>{" "}
                                {/* Hiển thị tên người dùng */}
                                <Nav.Link href="#" onClick={handLogout}>
                                    Logout
                                </Nav.Link>{" "}
                                {/* Thay thế bằng nút "Logout" */}
                                <Nav.Link href="#" onClick={handleShowCart}>
                                    <div
                                        className="cart-shopping"
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            position: "relative",
                                            top: "3px",
                                        }}
                                    >
                                        <i class="fa-solid fa-cart-shopping"></i>
                                        <p
                                            style={{
                                                position: "absolute",
                                                top: "-15px",
                                                right: "-16px",
                                                backgroundColor: "red",
                                                borderRadius: "55px",
                                                padding: "0 5px",
                                            }}
                                        >
                                            {cartLength}
                                        </p>
                                    </div>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>{" "}
                                {/* Hiển thị nút "Login" */}
                                <Nav.Link href="/register">
                                    Register
                                </Nav.Link>{" "}
                                {/* Hiển thị nút "Register" */}
                            </>
                        )}
                    </Nav>
                    {showUserInfoModal && (
                        <UserInfoModal
                            user={resultUser}
                            onUpdateUser={handleUpdateUser}
                            onHide={handleCloseUserInfoModal}
                        />
                    )}

                    <Modal
                        show={showCartModal}
                        onHide={handleCloseCartModal}
                        animation={false}
                        size="xl"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Your Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {cartProduct.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <ul>
                                    {cartProduct.map((product) => (
                                        <li key={product.id}>
                                            {product.name} - Quantity:{" "}
                                            {product.quantity}
                                            <button
                                                onClick={() =>
                                                    handleIncreaseQuantity(
                                                        product
                                                    )
                                                }
                                            >
                                                Increase
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDecreaseQuantity(
                                                        product
                                                    )
                                                }
                                            >
                                                Decrease
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        product
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={handleCloseCartModal}
                            >
                                Close
                            </Button>
                            <Button variant="primary">Order</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* modal search */}
                    <Modal
                        show={showSearchModal}
                        onHide={handleCloseSearchModal}
                        animation={false}
                        size="xl"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Search Results</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {searchResults.length === 0 ? (
                                <p>No results found.</p>
                            ) : (
                                <ul>
                                    {searchResults.map((product) => (
                                        <li key={product.id}>
                                            {product.name} - Price:{" "}
                                            {product.price}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={handleCloseSearchModal}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavScrollExample;

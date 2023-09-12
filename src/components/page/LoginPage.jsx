// LoginPage.jsx
import React, { useState, useEffect } from "react";
import "./Login.css";
import Navbar from "../layout/main/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [name, setName] = useState([]); // Thêm biến state để lưu tên người dùng
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm biến state để theo dõi trạng thái đăng nhập

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `http://localhost:8000/users?email=${email}&password=${password}`
            );
            const data = response.data;

            if (data.length > 0) {
                setMessage("Login successful");
                setMessageType("message-success");

                if (data[0].role === "admin") {
                    localStorage.setItem("userLogin", JSON.stringify(data[0]));
                    navigate("/admin");
                } else if (
                    data[0].role === "regular" &&
                    data[0].status !== "blocked"
                ) {
                    localStorage.setItem("userLogin", JSON.stringify(data[0]));
                    navigate("/");
                } else {
                    setMessage("Your Account was blocked");
                    setMessageType("message-error");
                }
            } else {
                setMessage("Invalid email or password");
                setMessageType("message-error");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error.");
            setMessageType("message-error");
        }
    };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} name={name} />{" "}
            {/* Truyền thông tin đăng nhập và tên người dùng vào Navbar */}
            <div className="container_login">
                <form
                    action="#"
                    className="sign-in-form"
                    onSubmit={handleSubmit}
                >
                    <h2 className="title">Login</h2>
                    {message && <p className="message">{message}</p>}
                    <div className="input-field">
                        <i className="fas fa-envelope" />
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <a href="/register" className="href">
                        Do not have an account? Register!
                    </a>
                    <button type="submit" value="login" className="btn solid">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

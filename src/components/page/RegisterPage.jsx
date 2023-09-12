// src/Registration.js
import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import Navbar from "../layout/main/Navbar";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        role: "regular"
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // Thêm messageType

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTogglePassword = (field) => {
        if (field === "password") {
            setShowPassword(!showPassword);
        } else if (field === "confirmPassword") {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra mật khẩu và mật khẩu xác nhận có trùng khớp không
        if (formData.password !== formData.confirmPassword) {
            setMessage("Mật khẩu và xác nhận mật khẩu phải giống nhau.");
            setMessageType("message-error"); // Đặt màu cho thông báo lỗi
            return;
        }

        // Kiểm tra xem email đã tồn tại trong URL hay chưa bằng Axios
        try {
            const response = await axios.get("http://localhost:8000/users");
            const data = response.data;

            const existingUser = data.find(
                (user) => user.email === formData.email
            );
            if (existingUser) {
                setMessage("Email đã tồn tại trong hệ thống.");
                setMessageType("message-error"); // Đặt màu cho thông báo lỗi
                return;
            }

            // Nếu không có email trùng, thêm dữ liệu vào URL bằng Axios
            await axios.post("http://localhost:8000/users", formData);

            setMessage("Đăng ký thành công!");
            setMessageType("message-success"); // Đặt màu cho thông báo thành công
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                birthday: "",
            });
            window.location.href = "/login";
        } catch (error) {
            console.error("Lỗi khi kiểm tra dữ liệu hoặc thêm dữ liệu:", error);
            setMessage("Đã xảy ra lỗi.");
            setMessageType("message-error"); // Đặt màu cho thông báo lỗi
        }
    };

    return (
        <div>
            <Navbar />

            <div className="registration-container">
                {message && (
                    <p className={`message ${messageType}`}>
                        {message}
                    </p> /* Áp dụng class messageType */
                )}
                <form onSubmit={handleSubmit}>
                    <h2>CREATE AN ACCOUNT</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            className="input-group"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="input-group"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                className="input-group"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className={`password-toggle ${
                                    showPassword ? "active" : ""
                                }`}
                                onClick={() => handleTogglePassword("password")}
                            >
                                👁️
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="password-input">
                            <input
                                className="input-group"
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className={`password-toggle ${
                                    showConfirmPassword ? "active" : ""
                                }`}
                                onClick={() =>
                                    handleTogglePassword("confirmPassword")
                                }
                            >
                                👁️
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Birthdate</label>
                        <input
                            className="input-group"
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;

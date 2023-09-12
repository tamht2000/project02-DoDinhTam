import React, { useState, useEffect } from "react";
import HeaderAdmin from "../../Layout/HeaderAdmin";
import Sidebar from "../../Layout/Sildebar";
import axios from "axios";
import "./ManagerProduct.css";

function ManagerProduct() {

  // phân trang sản phẩm
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({});

    // Fetch danh sách sản phẩm từ API khi component được mount
    useEffect(() => {
        axios.get("http://localhost:8000/products").then((response) => {
            setProducts(response.data);
        });
    }, []);

    // Hàm xử lý khi người dùng thay đổi dữ liệu trên form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Hàm xử lý khi người dùng ấn nút "Thêm mới"
    const handleAddProduct = () => {
        // Gửi dữ liệu formData lên API để thêm sản phẩm mới
        axios
            .post("http://localhost:8000/products", formData)
            .then((response) => {
                // Cập nhật danh sách sản phẩm sau khi thêm mới
                setProducts([...products, response.data]);
                setFormData({});
            });
    };

    // Hàm xử lý khi người dùng ấn nút "Sửa"
    const handleEditProduct = (productId) => {
        // Gửi dữ liệu formData lên API để sửa thông tin sản phẩm
        axios
            .put(`http://localhost:8000/products/${productId}`, formData)
            .then(() => {
                // Cập nhật danh sách sản phẩm sau khi sửa
                const updatedProducts = products.map((product) =>
                    product.id === productId
                        ? { ...product, ...formData }
                        : product
                );
                setProducts(updatedProducts);
                setFormData({});
            });
    };

    // Hàm xử lý khi người dùng ấn nút "Xoá"
    const handleDeleteProduct = (productId) => {
        // Gửi yêu cầu xoá sản phẩm lên API
        axios.delete(`http://localhost:8000/products/${productId}`).then(() => {
            // Cập nhật danh sách sản phẩm sau khi xoá
            const updatedProducts = products.filter(
                (product) => product.id !== productId
            );
            setProducts(updatedProducts);
        });
    };

    return (
        <div className="grid-container">
            <HeaderAdmin />
            <Sidebar />
            <main className="main-container">
                <div className="main-title">
                    <h3>ManagerProduct</h3>
                </div>
                <div className="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <img src={product.image} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleEditProduct(product.id)
                                            }
                                            className="btn-warning"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteProduct(product.id)
                                            }
                                            className="btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="product-form">
                    <h4>Thêm/Sửa Sản phẩm</h4>
                    <form>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="price"
                            value={formData.price || ""}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                        />
                        <input 
                          type="text" 
                          name="image"
                          placeholder="image"
                          value={formData.image || ""}
                          onChange={handleInputChange}
                           />
                        {formData.id ? (
                            <button
                                onClick={() => handleEditProduct(formData.id)}
                            >
                                Lưu Sửa
                            </button>
                        ) : (
                            <button onClick={handleAddProduct}>Thêm mới</button>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ManagerProduct;

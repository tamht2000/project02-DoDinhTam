import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../layout/main/Navbar";
import "./ProductDetail.css";

function ProductDetail({ match }) {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    // const productId = match.params.id; // Lấy id sản phẩm từ URL

    useEffect(() => {
        // Sử dụng id sản phẩm để lấy thông tin sản phẩm từ API
        axios
            .get(`http://localhost:8000/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="content-detail">
                <h1 className="text-title">Product Detail</h1>
                <div>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Price: {product.price} $</p>
                    <p>Description: {product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

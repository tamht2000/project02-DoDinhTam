import React from "react";
import Navbar from "../../layout/main/Navbar";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import "./Header.css";

function Header({ check, handleSelectType }) {

    return (
        <div className="header-page">
            <Navbar checkt={check} />
            <div className="container" style={{ width: "1100px" }}>
                <Carousel data-bs-theme="dark" style={{ top: "110px" }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://wallpapersmug.com/download/1600x900/ddcbbf/food-pizza-baking.jpg"
                            height={"400px"}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://media.cntraveler.com/photos/61017da4a41bc3aa30d3b547/16:9/w_1920%2Cc_limit/Liza%2520nouveau%2520restaurant%2520%25C2%25A9%2520Joann%2520Pai%2520(39).jpg"
                            height={"400px"}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            height={"400px"}
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="banner_left">
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/animated-burger-fast-food-bar-ad-design-template-0a6088b07006d607e85546a5a56e98dd_screen.jpg?ts=1637052735" />
            </div>
            <div className="banner_right">
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-delivery-banner-poster-template-design-2fcbd73b821d3f6ed86c0a930e69c429_screen.jpg?ts=1665596399" />
            </div>

            <div className="product-type">
                <div
                    className="product-flash-sales"
                    onClick={() => handleSelectType("sale")}
                >
                    Flash Sales
                </div>
                <div
                    className="product-new"
                    onClick={() => handleSelectType("new")}
                >
                    New-In
                </div>
                <div
                    className="product-wagyu"
                    onClick={() => handleSelectType("wagyu")}
                >
                    Wagyu Selection
                </div>
                <div
                    className="product-fruit"
                    onClick={() => handleSelectType("fruit")}
                >
                    Fruit for baking
                </div>
            </div>
        </div>
    );
}

export default Header;

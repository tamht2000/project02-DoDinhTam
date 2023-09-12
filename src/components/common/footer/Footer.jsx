import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer-container">
            <div className="container">
                <div className="container_wrapper">
                    <div className="row_first">
                        <div className="row--first">
                            <div className="footer_logo" id="">
                                <a href="https://classicdeli.vn/hanoi/">
                                    <img
                                        className="logo img-responsive"
                                        loading="lazy"
                                        src="/Chef hat with spoon and fork logo design.png"
                                        alt="Classic Deli Vietnam"
                                    />
                                </a>
                            </div>

                            <div className="an_copyright col-xs-12">
                                <p>
                                    © 2023
                                    <br />
                                    Classic Fine Foods
                                </p>
                                <p>
                                    <a href="http://online.gov.vn/Home/WebDetails/65239">
                                        <img
                                            src="https://classicdeli.vn/img/cms/logoSaleNoti-1.png"
                                            alt=""
                                            width={150}
                                            height={57}
                                        />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row_second">
                        <div className="boxx information">
                            <h3 className="h3">Informations</h3>
                            <ul id="footer_sub_menu_31291" className="">
                                <li>
                                    <a
                                        id="link-cms-page-2-2"
                                        className="cms-page-link"
                                        href="https://classicdeli.vn/hanoi/en/content/2-privacy-and-data-protection"
                                        title="Legal notice"
                                    >
                                        Privacy and data protection
                                    </a>
                                </li>
                                <li>
                                    <a
                                        id="link-cms-page-3-2"
                                        className="cms-page-link"
                                        href="https://classicdeli.vn/hanoi/en/content/3-terms-conditions"
                                        title="Our terms and conditions of use"
                                    >
                                        Terms &amp; conditions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        id="link-cms-page-1-2"
                                        className="cms-page-link"
                                        href="https://classicdeli.vn/hanoi/en/content/1-order-payment-delivery-returns"
                                        title="Our terms and conditions of delivery"
                                    >
                                        Order, payment, delivery, returns
                                    </a>
                                </li>
                                <li>
                                    <a
                                        id="link-cms-page-5-2"
                                        className="cms-page-link"
                                        href="https://classicdeli.vn/hanoi/en/content/5-referral-loyalty-reward-point-program"
                                        title="Our secure payment method"
                                    >
                                        Referral &amp; loyalty reward point
                                        program
                                    </a>
                                </li>
                                <li>
                                    <a
                                        id="link-cms-page-6-2"
                                        className="cms-page-link"
                                        href="https://classicdeli.vn/hanoi/en/content/6-faq"
                                        title=""
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        id="link-static-page-contact-2"
                                        className="cms-page-link"
                                        href="https://classicdeli.vn/hanoi/en/contact-us"
                                        title="Use our form to contact us"
                                    >
                                        Contact us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="boxx account">
                            <h3 className="myaccount-title">Account</h3>
                            <ul
                                className="account-list"
                                id="footer_account_list"
                            >
                                <li>
                                    <a
                                        href="https://classicdeli.vn/hanoi/en/identity"
                                        title="Personal info"
                                        rel="nofollow"
                                    >
                                        Personal info
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://classicdeli.vn/hanoi/en/order-history"
                                        title="Orders"
                                        rel="nofollow"
                                    >
                                        Orders
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://classicdeli.vn/hanoi/en/credit-slip"
                                        title="Credit slips"
                                        rel="nofollow"
                                    >
                                        Credit slips
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://classicdeli.vn/hanoi/en/addresses"
                                        title="Addresses"
                                        rel="nofollow"
                                    >
                                        Addresses
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://classicdeli.vn/hanoi/en/discount"
                                        title="Vouchers"
                                        rel="nofollow"
                                    >
                                        Vouchers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="//classicdeli.vn/hanoi/en/module/ps_emailalerts/account"
                                        title="My alerts"
                                    >
                                        My alerts
                                    </a>
                                </li>
                                <style
                                    dangerouslySetInnerHTML={{
                                        __html: "\n.footer-container #giftcard-link {\n    display: none;\n}\n",
                                    }}
                                />
                                {/* MODULE Giftcard */}
                                <a
                                    className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                                    href="https://classicdeli.vn/hanoi/en/gift-cards?my_gifts=show"
                                    title="My giftcards"
                                    id="giftcard-link"
                                >
                                    <span className="link-item">
                                        <i className="material-icons">
                                            card_giftcard
                                        </i>
                                        Purchased Giftcards
                                    </span>
                                </a>
                                {/* END : MODULE Giftcard */}
                            </ul>
                        </div>
                        <div className="boxx store">
                            <div className="block-contact_content">
                                <h3 className="myaccount-title">Store</h3>
                                <div className="block-contact-name">
                                    <i>Classic Deli Vietnam</i>
                                </div>
                                <div className="block-contact-item block-contact-item--address">
                                    <span className="block-contact-item_icon">
                                        <i className="material-icons">
                                            location_on
                                        </i>
                                    </span>
                                    <div className="block-contact-item_text">
                                        <i>
                                            1/196 Nguyen Son Street, Bo De Ward,
                                            Long Bien District, Hanoi City,
                                            Hanoi City, Vietnam
                                        </i>
                                    </div>
                                </div>
                                <div className="block-contact-item block-contact-item--phone">
                                    <span className="block-contact-item_icon">
                                        <i className="material-icons">call:</i>
                                    </span>
                                    <div className="block-contact-item_text">
                                        <a href="tel:+84 24 3873 6079/ 80">
                                            +84 24 3873 6079/ 80
                                        </a>
                                    </div>
                                </div>
                                <div className="block-contact-item block-contact-item--email">
                                    <span className="block-contact-item_icon">
                                        <i className="material-icons">email:</i>
                                    </span>
                                    <div className="block-contact-item_text">
                                        <a href="mailto:hanoi@classicdeli.market">
                                            hanoi@classicdeli.market
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="boxx follow">
                            <h3 className="block-social-title">Follow us</h3>

                            <ul>
                                <li className="facebook">
                                    <a href="https://www.facebook.com/TamTiTu.FC.RoNaLdO">
                                        <i class="fa-brands fa-facebook"></i>
                                    </a>
                                </li>

                                <li className="instagram">
                                    <a href="https://www.instagram.com/classicdelivn/">
                                        <i class="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

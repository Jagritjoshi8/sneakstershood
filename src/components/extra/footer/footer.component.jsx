import React from "react";
import { CouponsContainer } from "../../coupons/coupons.component";
import "./footer.styles.scss";
import { useSelector } from "react-redux";
import { UserMailFormContainer } from "../../userMailForm/userMailForm";

const FooterContainer = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <footer data-aos="zoom-in-down" data-aos-duration="2500">
      <UserMailFormContainer />
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@sneakershood.com</p>
          <p>Phone: +91 6469748872</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>Facebook</p>
        </div>
        <div className="footer-section">
          <h2>Address</h2>
          <p>Luxria Business Hub,Vesu,Surat</p>
          <p>Gujarat, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 SneakersHood. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterContainer;

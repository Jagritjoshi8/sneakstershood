import React from "react";
import "./sellerDropModal.styles.scss";

const SellerDropModal = ({ isOpen, imageUrl, onClose }) => {
  return (
    <div
      className={`sellerdropmodal ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <span className="close" onClick={onClose}>
        X
      </span>
      <img className="modal-content" src={imageUrl} alt="Modal Content" />
    </div>
  );
};

export default SellerDropModal;

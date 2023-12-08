import * as React from "react";
import "./receiptUserModal.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import jsPDF from "jspdf";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import QRCode from "qrcode.react";
import Tooltip from "@mui/material/Tooltip";

export default function ReceiptUserModal({ orderId, orderNo }) {
  const [open, setOpen] = React.useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const { orderDetails } = useSelector((state) => state.order);
  let srno = 0;
  const handleClickOpen = () => {
    setOpen(true);
    let selectedOrder = orderDetails.userOrder.filter(
      (order) => order._id === orderId
    );
    console.log("selectedUserOrder", selectedOrder);

    selectedOrder = selectedOrder[0];
    setCurrentOrder(selectedOrder);
  };
  const pageRef = useRef(null);

  const handleDownload = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(pageRef.current, {
        quality: 0.95,
      });

      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ReceiptNo.#${orderNo}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {
    _id,
    orderStatus,
    coustomerDetails,
    deliveryDate,
    createdAt,
    deliveryAddress,
    orderItems,
    order,
  } = currentOrder;
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const formattedDate = formatTimestamp(createdAt);
  const receiptData = `RECEIPT DETAILS FROM SNEAKERS HOOD:\n\nOrder ID: ${orderId}\nBuyer Name: ${
    coustomerDetails?.name
  }\nTotal Amount: ₹${order?.amount / 100}\nDeliveryDate: ${deliveryDate}`;

  return (
    <React.Fragment>
      <Tooltip title="Receipt">
        <ReceiptLongIcon
          sx={{ fontSize: 38 }}
          onClick={handleClickOpen}
          className="recipt-icon-btn"
        />
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
        <div className="receipt-user-modal">
          <div className="sellerorder-modal" id="myPage" ref={pageRef}>
            <DialogTitle className="sellerorder-modal-header">
              <h1> Receipt:</h1>
              <div className="id-status-contianer">
                {" "}
                <p className="odId">receipt#{orderNo}</p>{" "}
              </div>
            </DialogTitle>
            <DialogContent>
              <div className="viewSeller-order-container">
                <div className="deliverydetail-qrcode">
                  <div className="delivery-details">
                    <h2>Delivery Details:</h2>
                    <div className="bd-info-container">
                      <div className="bd-single-info">
                        <h3>Ordered On:</h3> <span>{formattedDate}</span>
                      </div>
                      <div className="bd-single-info">
                        <h3>Delivery Date:</h3> <span>{deliveryDate}</span>
                      </div>
                      <div className="bd-single-info">
                        <h3>Delivery Address:</h3>{" "}
                        <span>{deliveryAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div className="userqrcode-container">
                    <QRCode
                      value={receiptData}
                      //   size={256}
                      style={{
                        height: "225px",
                        width: "225px",
                      }}
                    />
                  </div>
                </div>
                <div className="seller-order-content">
                  <h2>Product Details:</h2>
                  <hr />
                  <table>
                    <tr className="table-headers">
                      <th>Sr No.</th>
                      <th>Product</th>
                      <th>Each Price</th>
                      <th>Size</th>
                      <th>Quantity </th>
                      <th>Total Price</th>
                    </tr>
                    {orderItems?.map((product) => {
                      srno++;
                      let bkimg;
                      if (product) {
                        if (product.img?.includes("uploads")) {
                          bkimg = `http://localhost:8000/${product.img}`;
                        } else {
                          bkimg = product.img;
                        }
                      }
                      return (
                        <tr key={product._id}>
                          <td>{srno}</td>
                          <td>
                            <Link to={`/product-details/${product._id}`}>
                              <div className="cart-card-image">
                                <Tilt
                                  transitionSpeed={2000}
                                  tiltMaxAngleX={35}
                                  tiltMaxAngleY={35}
                                  scale={1.4}
                                >
                                  <img src={bkimg} />
                                </Tilt>
                                <h3>{product.name}</h3>
                              </div>
                            </Link>
                          </td>
                          <td>₹{product.discounted_price}</td>
                          <td>{product.size}</td>
                          <td>{product.cartQuantity}</td>
                          <td>
                            ₹{product.discounted_price * product.cartQuantity}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="5" align="right" className="table-result">
                        Total Amount Paid:{" "}
                      </th>{" "}
                      <td className="final-result">₹{order?.amount / 100}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </DialogContent>
          </div>
          <DialogActions>
            <Button onClick={() => handleDownload()}>Download Receipt</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

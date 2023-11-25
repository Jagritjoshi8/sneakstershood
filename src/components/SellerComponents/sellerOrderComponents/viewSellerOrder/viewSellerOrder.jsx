import * as React from "react";
import "./viewSellerOrder.Styles.scss";
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

export default function ViewSellerModal({ orderId }) {
  const [open, setOpen] = React.useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const { sellerOrderDetails } = useSelector((state) => state.order);
  let srno = 0;
  const handleClickOpen = () => {
    setOpen(true);
    let selectedOrder = sellerOrderDetails.sellerOrder.filter(
      (order) => order._id === orderId
    );
    console.log("selectedOrder", selectedOrder);
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
      pdf.save(`OrderNo.${orderId}.pdf`);
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
    sellerPriceSum,
  } = currentOrder;
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const formattedDate = formatTimestamp(createdAt);
  return (
    <React.Fragment>
      <button className="viewsorderbtn" onClick={handleClickOpen}>
        view
      </button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
        <div className="sellerorder-modal" id="myPage" ref={pageRef}>
          <DialogTitle className="sellerorder-modal-header">
            <h1> Order Details:</h1>
            <div className="id-status-contianer">
              {" "}
              <p className="odId">{_id}</p>{" "}
              <p className={`oSt ${orderStatus}`}>{orderStatus}</p>
            </div>
          </DialogTitle>
          <DialogContent>
            <div>
              <div className="viewSeller-order-container">
                <div className="buyer-details">
                  <h2>Buyer Details:</h2>
                  <div className="bd-info-container">
                    <div className="bd-single-info">
                      <h3>Buyer Name:</h3> <span>{coustomerDetails?.name}</span>
                    </div>
                    <div className="bd-single-info">
                      <h3>Buyer Email:</h3>{" "}
                      <span>{coustomerDetails?.email}</span>
                    </div>
                    <div className="bd-single-info">
                      <h3>Buyer Contact No:</h3>{" "}
                      <span>{coustomerDetails?.contact}</span>
                    </div>
                  </div>
                </div>

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
                      <h3>Delivery Address:</h3> <span>{deliveryAddress}</span>
                    </div>
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
                        Total Amount Received:{" "}
                      </th>{" "}
                      <td className="final-result">₹{sellerPriceSum}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={() => handleDownload()}>Download PDF</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

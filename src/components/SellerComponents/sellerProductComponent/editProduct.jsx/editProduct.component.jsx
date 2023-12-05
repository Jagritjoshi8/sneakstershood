import * as React from "react";
import "./editProduct.styles.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormInput from "../../../authenticaton/formInput.component";
import { editProduct } from "../../../../features/productSlice";

export default function EditProductContainer({ prodId }) {
  const [open, setOpen] = React.useState(false);
  const [currentProd, setCurrentProd] = useState({});
  const { sellerProducts } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [original_price, setOriginalPrice] = useState("");
  const [discountper, setDiscountPer] = useState("");
  const [is_stock, setIsStock] = useState(true);
  const [productimg, setProductimg] = useState(null);
  const [previewURL, setPreviewURL] = useState(
    "https://thumbs.dreamstime.com/b/no-picture-available-sign-illustration-255245956.jpg"
  );
  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd = sellerProducts.filter((prod) => prod._id === prodId);
    selectedProd = selectedProd[0];
    const discountper = Math.floor(
      ((selectedProd.original_price - selectedProd.discounted_price) /
        selectedProd.original_price) *
        100
    );
    setCurrentProd(selectedProd);
    let bkimg;
    if (selectedProd.img.includes("uploads")) {
      bkimg = `http://localhost:8000/${selectedProd.img}`;
    } else {
      bkimg = selectedProd.img;
    }

    setPreviewURL(bkimg);
    setName(selectedProd.name);
    setOriginalPrice(selectedProd.original_price);
    setDiscountPer(discountper);
    setIsStock(selectedProd.is_stock);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setIsStock(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authseller = useSelector((state) => state.authseller);
  const products = useSelector((state) => state.products);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("original_price", original_price);
    formData.append("discountper", discountper);
    formData.append("is_stock", is_stock);
    formData.append("productimg", productimg);
    dispatch(
      editProduct({
        productId: prodId,
        updatedData: formData,
      })
    );
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button className="editproductbtn" onClick={handleClickOpen}>
        EdiT
      </Button> */}
      <button className="editproductbtn" onClick={handleClickOpen}>
        Edit
      </button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
        <div
          className="edit-product-modal"
          data-aos="fade-in"
          data-aos-duration="1500"
        >
          <DialogTitle className="edit-modal-header">
            <h1> Edit Your Product:</h1>
          </DialogTitle>
          <DialogContent>
            <div className="edit-form-container">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-inner-container">
                  <div className="left-column">
                    <div className="c2">
                      <label>Upload Your Sneaker Image: </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="productimg"
                        name="productimg"
                        required
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          setProductimg(selectedFile);
                          if (selectedFile) {
                            const imageURL = URL.createObjectURL(selectedFile);
                            setPreviewURL(imageURL);
                          }
                        }}
                      />
                    </div>
                    <FormInput
                      label="Sneaker Name"
                      placeHolder="Enter Product Name Here.."
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      value={name}
                    />
                    <FormInput
                      label="Original Price"
                      type="number"
                      id="original_price"
                      name="original_price"
                      placeHolder="Enter Orginal Price Of Product Here.."
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      required
                      value={original_price}
                    />
                    <FormInput
                      label="Discount % "
                      type="number"
                      id="discountper"
                      name="discountper"
                      placeHolder="Enter % Discount Here..."
                      onChange={(e) => setDiscountPer(e.target.value)}
                      required
                      value={discountper}
                    />
                    <FormControl>
                      <div className="formControl">
                        <FormLabel
                          id="demo-controlled-radio-buttons-group"
                          className="formLabel"
                        >
                          Availabilty:
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={is_stock}
                          row
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="In Stock"
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "24px",
                              },
                            }}
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Out Of Stock"
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "24px",
                              },
                            }}
                          />
                        </RadioGroup>
                      </div>
                    </FormControl>
                  </div>
                  <div className="profile-img-container">
                    <div className="c1">
                      <img src={previewURL} alt="Profile Preview" width="250" />
                    </div>
                  </div>
                </div>

                <div className="button-warning-container">
                  {/* <div>
                {products.creatingStatus === "rejected" ? (
                  <p>Warning: {products.creatingError.message}</p>
                ) : null}
              </div> */}
                  <button type="submit">Confirm Edit</button>
                </div>
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

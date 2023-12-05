import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../../authenticaton/formInput.component";
import "./createProduct.styles.scss";
import { createProduct } from "../../../../features/productSlice";

const CreateProductContainer = () => {
  const [name, setName] = useState("");
  const [original_price, setOriginalPrice] = useState("");
  const [discountper, setDiscountPer] = useState("");
  const [category_name, setCategoryName] = useState("");
  const [is_stock, setIsStock] = useState(true);
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [qualityType, setQualityType] = useState("");
  const [description, setDescription] = useState("");
  const [productimg, setProductimg] = useState(null);
  const [previewURL, setPreviewURL] = useState(
    "https://thumbs.dreamstime.com/b/no-picture-available-sign-illustration-255245956.jpg"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authseller = useSelector((state) => state.authseller);
  const products = useSelector((state) => state.products);
  console.log("name", authseller);
  console.log("pro", products);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("original_price", original_price);
    formData.append("discountper", discountper);
    formData.append("category_name", category_name);
    formData.append("is_stock", is_stock);
    formData.append("size", size);
    formData.append("brand", brand);
    formData.append("color", color);
    formData.append("qualityType", qualityType);
    formData.append("description", description);
    formData.append("productimg", productimg);
    formData.append("sellerId", authseller._id);
    formData.append("sellerName", authseller.businessName);

    dispatch(createProduct(formData));
    setName("");
    setOriginalPrice("");
    setDiscountPer("");
    setBrand("");
    setCategoryName("");
    setColor("");
    setSize("");
    setDescription("");
    setProductimg("");
    setQualityType("");
    setPreviewURL(
      "https://thumbs.dreamstime.com/b/no-picture-available-sign-illustration-255245956.jpg"
    );
  };

  return (
    <div
      className="create-product-container"
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="profile-img-container">
          <div className="c1">
            <img src={previewURL} alt="Profile Preview" width="250" />
          </div>
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
        </div>
        <div className="form-inner-container">
          <div className="left-colum">
            <FormInput
              label="Sneaker Name"
              placeHolder="Enter Product Name Here.."
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
              className="formInput"
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
            <FormInput
              label="Sneaker Size"
              type="number"
              id="size"
              name="size"
              placeHolder="Enter Sneaker Size Here.."
              onChange={(e) => setSize(e.target.value)}
              required
              value={size}
            />
          </div>
          <div className="right-column">
            <FormInput
              label="Sneaker Brand"
              type="text"
              id="brand"
              name="brand"
              placeHolder="Enter Sneaker's Brand Here.."
              onChange={(e) => setBrand(e.target.value)}
              required
              value={brand}
            />
            <div className="select-group">
              <label className="l1">Product Category:</label>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: "49%", minHeight: 60 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Select Product Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category_name}
                  onChange={(e) => setCategoryName(e.target.value)}
                  label=" Select Product Category"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.24);",
                    fontSize: "20px",
                    paddingLeft: "10px",
                    border: "1px solid #ccc;",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"men"}>Mens' Wear</MenuItem>
                  <MenuItem value={"women"}>Women's Wear</MenuItem>
                  <MenuItem value={"kid"}>Kid's Wear</MenuItem>
                </Select>
              </FormControl>
            </div>

            <FormInput
              label="Quality Type"
              type="text"
              id="qualityType"
              name="qualityType"
              placeHolder="Enter Quality Type Of Sneaker Here.."
              value={qualityType}
              onChange={(e) => setQualityType(e.target.value)}
              required
            />
            <FormInput
              label="Sneaker Color"
              type="text"
              id="color"
              name="color"
              placeHolder="Enter Color Of Sneaker Here.."
              onChange={(e) => setColor(e.target.value)}
              required
              value={color}
            />
          </div>
        </div>
        <div className="product-descriptions">
          <label>Sneaker's Description:</label>
          <textarea
            id="description"
            name="description"
            placeHolder="Enter Description Of Sneaker Here.."
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            cols="20"
            value={description}
          ></textarea>
        </div>

        <div className="button-warning-container">
          <div>
            {products.creatingStatus === "rejected" ? (
              <p>Warning: {products.creatingError.message}</p>
            ) : null}
          </div>
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductContainer;

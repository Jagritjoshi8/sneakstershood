import React, { useState } from "react";
import "./sellerBlog.scss";
import { useSelector } from "react-redux";
import FormInput from "../../../components/authenticaton/formInput.component";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SellerDropModal from "../../../components/homecontainers/sellerDropModal/sellerDropModal.component";

const SellerBLog = () => {
  const [imageUrl, SetImageUrl] = useState("null");
  const [posterImageUrl, setPosterImageUrl] = useState("null");
  const [hashTags, setHashTags] = useState("null");
  const [blogContent, setBlogContent] = useState("null");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleSubmit = () => {};
  const authseller = useSelector((state) => state.authseller);
  let sellerLogo;
  if (authseller?.logoimg) {
    sellerLogo = `http://localhost:8000/${authseller?.logoimg}`;
  }
  const todaysDate = Date.now();
  const formattedTodaysDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(todaysDate);
  return (
    <div>
      <div className="seller-blog-container">
        <div className="seller-blog-form">
          <form onSubmit={handleSubmit}>
            <div className="left-coloumn">
              <FormInput
                label="Blog Image URL"
                placeHolder="Paste Blog Image URL Here.."
                type="text"
                id="imageUrl"
                name="imageUrl"
                onChange={(e) => SetImageUrl(e.target.value)}
                required
              />
              <FormInput
                label="Blog Poster URL"
                type="text"
                id="original_price"
                name="original_price"
                placeHolder="Paste Blog Poster URL Here..."
                onChange={(e) => setPosterImageUrl(e.target.value)}
                required
              />
              <FormInput
                label="Blog Hashtags"
                type="text"
                id="discountper"
                name="discountper"
                placeHolder="Enter Hastags For Your Blog Here..."
                onChange={(e) => setHashTags(e.target.value)}
                required
                //   value={discountper}
              />

              <div className="form-group">
                <label>Blog Content:</label>

                <div className="input-info-container">
                  <textarea
                    id="query"
                    name="query"
                    placeHolder="Enter Your Blog Content Here.."
                    onChange={(e) => setBlogContent(e.target.value)}
                    // value={query}
                    required
                    rows="6"
                    maxLength={200}
                  ></textarea>
                </div>
              </div>
              <button type="submit"> Upload Blog</button>
            </div>
          </form>
        </div>

        <div>
          <h2>Your Blog Preview:</h2>
          <Card sx={{ maxWidth: 400 }} raised="true" className="order-card">
            <CardHeader
              titleTypographyProps={{
                fontSize: 21,
              }}
              subheaderTypographyProps={{
                fontSize: 15,
              }}
              avatar={
                <Avatar aria-label="recipe">
                  <img src={sellerLogo} alt="" height="50px" width="60px" />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <KeyboardDoubleArrowRightIcon
                    className="order-linkbutton"
                    sx={{ fontSize: 38 }}
                    color="secondary"
                    onClick={() => openModal(`${posterImageUrl}`)}
                  />
                </IconButton>
              }
              // title={product.name}
              title={authseller?.businessName}
              subheader={formattedTodaysDate}
            />
            <CardMedia
              component="img"
              height="400"
              //   image="https://i.pinimg.com/originals/77/52/0b/77520bcc3fd917f45da9abc125148f8d.jpg"
              image={imageUrl}
              alt="sneaker"
            />
            <CardContent className="order-content">
              <div>
                <span>{hashTags}</span>
              </div>
              <div>
                {" "}
                {blogContent}
                {/* Wolaa..!! 🤯 There is new nike sneaker in the town,so hold up
                your seat buddies we are going launch Nike Electric 2.0 soon 🤩.
                So, pre-order now your #Nike_Electric_2.0. */}
              </div>
            </CardContent>
          </Card>
          <SellerDropModal
            isOpen={modalOpen}
            imageUrl={selectedImageUrl}
            onClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerBLog;

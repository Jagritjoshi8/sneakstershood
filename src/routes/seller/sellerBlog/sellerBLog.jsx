import React, { useState } from "react";
import "./sellerBlog.scss";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/authenticaton/formInput.component";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SellerDropModal from "../../../components/homecontainers/sellerDropModal/sellerDropModal.component";
import { uploadBlog } from "../../../features/sellerBlogSlice";

const SellerBLog = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [posterImageUrl, setPosterImageUrl] = useState(null);
  const [hashTags, setHashTags] = useState(null);
  const [blogContent, setBlogContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const dispatch = useDispatch();
  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      uploadBlog({
        sellerLogoimg: authseller?.logoimg,
        sellerName: authseller?.businessName,
        imageUrl,
        posterImageUrl,
        hashTags,
        blogContent,
      })
    );

    setImageUrl("");
    setPosterImageUrl("");
    setHashTags("");
    setBlogContent("");
  };

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
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
                required
              />
              <FormInput
                label="Blog Poster URL"
                type="text"
                id="posterUrl"
                name="posterUrl"
                placeHolder="Paste Blog Poster URL Here..."
                onChange={(e) => setPosterImageUrl(e.target.value)}
                value={posterImageUrl}
                required
              />
              <FormInput
                label="Blog Hashtags"
                type="text"
                id="hashtags"
                name="hashtags"
                placeHolder="Enter Hastags For Your Blog Here..."
                onChange={(e) => setHashTags(e.target.value)}
                required
                value={hashTags}
              />

              <div className="form-group">
                <label>Blog Content:</label>

                <div className="input-info-container">
                  <textarea
                    id="content"
                    name="content"
                    placeHolder="Enter Your Blog Content Here.."
                    onChange={(e) => setBlogContent(e.target.value)}
                    value={blogContent}
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
          <Card sx={{ width: 400 }} raised="true" className="order-card">
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
                    onClick={() =>
                      openModal(
                        posterImageUrl
                          ? posterImageUrl
                          : "/assets/images/valley.jpeg"
                      )
                    }
                  />
                </IconButton>
              }
              title={authseller?.businessName}
              subheader={formattedTodaysDate}
            />
            <CardMedia
              component="img"
              height="400"
              image={!imageUrl ? "/assets/images/valley.jpeg" : imageUrl}
              alt="sneaker"
            />
            <CardContent className="order-content">
              <div>
                <span>
                  {hashTags ? hashTags : "#hashtag1  #hashtag2  #hashtag3"}
                </span>
              </div>
              <div>
                {" "}
                {blogContent
                  ? blogContent
                  : "Yippee...!!🤩 This is dummy content here, provide any content related to your blog. New Launching 🎉 Holiday Discount 🤑  Trending Product 🔥 Top Rated Product🤯"}
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

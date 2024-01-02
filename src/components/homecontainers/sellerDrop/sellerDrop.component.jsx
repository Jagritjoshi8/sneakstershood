import React from "react";
import "./sellerDrop.styles.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SellerDropModal from "../sellerDropModal/sellerDropModal.component";
import { getAllBlogs } from "../../../features/sellerBlogSlice";

const SellerDropContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const sellerBlogs = useSelector((state) => state.sellerblog.sellerBlogs);
  // console.log(sellerBlogs);
  const latestBlogs = sellerBlogs?.slice().reverse().slice(0, 5);
  return (
    <div className="sellerDropContainer">
      <h1 data-aos="fade-left" data-aos-duration="2500">
        # Seller Blogs
      </h1>
      <div className="top-seller-drop">
        {" "}
        {latestBlogs.map((blog) => {
          let sellerLogo;
          if (blog?.sellerLogo) {
            sellerLogo = `http://localhost:8000/${blog?.sellerLogo}`;
          }
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(new Date(blog?.createdAt));
          return (
            <Card
              sx={{ width: 400 }}
              raised="true"
              className="order-card"
              key={blog._id}
              data-aos="fade-left"
              data-aos-duration="2500"
            >
              <CardHeader
                titleTypographyProps={{
                  fontSize: 21,
                }}
                subheaderTypographyProps={{
                  fontSize: 15,
                }}
                avatar={
                  <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
                    <img src={sellerLogo} alt="" height="50px" width="50px" />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <Tooltip title="View Poster" placement="top" arrow>
                      <KeyboardDoubleArrowRightIcon
                        className="order-linkbutton"
                        sx={{ fontSize: 38 }}
                        color="secondary"
                        onClick={() => openModal(blog.blogPosterUrl)}
                      />
                    </Tooltip>
                  </IconButton>
                }
                // title={product.name}
                title={blog.sellerName}
                subheader={formattedDate}
              />
              <CardMedia
                component="img"
                height="400"
                image={blog.blogImageUrl}
                alt="sneaker"
              />
              <CardContent className="order-content">
                <div>
                  <span>{blog?.blogHashTags}</span>
                </div>
                <div> {blog?.blogContent}</div>
              </CardContent>
            </Card>
          );
        })}
        <SellerDropModal
          isOpen={modalOpen}
          imageUrl={selectedImageUrl}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default SellerDropContainer;

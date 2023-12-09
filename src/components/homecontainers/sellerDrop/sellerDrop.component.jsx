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
  console.log(sellerBlogs);
  const latestBlogs = sellerBlogs?.slice().reverse();
  return (
    <div
      className="sellerDropContainer"
      data-aos="fade-left"
      //   data-aos-easing="ease-in-back"
      data-aos-offset="500"
      data-aos-duration="2900"
    >
      <h1># Seller Drop</h1>
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
        {/* <Card sx={{ maxWidth: 400 }} raised="true" className="order-card">
          <CardHeader
            titleTypographyProps={{
              fontSize: 21,
            }}
            subheaderTypographyProps={{
              fontSize: 15,
            }}
            avatar={
              <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
              </Avatar> }
            action={
              <IconButton aria-label="settings">
                <KeyboardDoubleArrowRightIcon
                  className="order-linkbutton"
                  sx={{ fontSize: 38 }}
                  color="secondary"
                  onClick={() =>
                    openModal(
                      "https://i.pinimg.com/originals/4e/31/42/4e3142435b7a0a2f5f1229db876c7ed4.jpg"
                    )
                  }
                />
              </IconButton>
            }
            // title={product.name}
            title="Sneaker Stash"
            subheader="Date: Nike"
          />
          <CardMedia
            component="img"
            height="400"
            image="https://virginactivesa.files.wordpress.com/2015/08/the-new-adidas-ultra-boost.jpg?w=584"
            alt="sneaker"
          />
          <CardContent className="order-content">
            <div>
              <span>#Adidas #New #UltraBoost</span>
            </div>
            <div>
              {" "}
             Whoopee..!!🥳 Hold your excitement buddies🤙, we are going to launch most awaited sneaker🤩 of this year Adidas's new Ultra Boost 🔥 running sneakers. So, share your reviews on #Adidas_UltraBoost🤯
            </div>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 400 }} raised="true" className="order-card">
          <CardHeader
            titleTypographyProps={{
              fontSize: 21,
            }}
            subheaderTypographyProps={{
              fontSize: 15,
            }}
            avatar={
              <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
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
                      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6e81bb21830667.5630832b66801.jpg"
                    )
                  }
                />
              </IconButton>
            }
            // title={product.name}
            title="Sneaker Stash"
            subheader="Date: Nike"
          />
          <CardMedia
            component="img"
            height="400"
            image="https://th.bing.com/th/id/R.b4ab0cb16c21a51d2e70fb3beac63409?rik=9mjjRspQ4TtM0w&riu=http%3a%2f%2fsportfits.com%2fwp-content%2fuploads%2f2014%2f10%2fadidas-d-rose-5-boost-light-scarlet-solar-blue.jpg&ehk=DKbiXcpjctl4TIWodxe%2fwkvnVbJ8sV2mnYNvxNGg4%2bM%3d&risl=&pid=ImgRaw&r=0"
            alt="sneaker"
          />
          <CardContent className="order-content">
            <div>
              <span>#Adidas #New #Sneaker_Stash</span>
            </div>
            <div>
              {" "}
              Wolaa..!! 🤯 There is new nike sneaker in the town,so hold up your
              seat buddies we are going launch Nike Electric 2.0 soon 🤩. So,
              pre-order now your #Nike_Electric_2.0.
            </div>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 400 }} raised="true" className="order-card">
          <CardHeader
            titleTypographyProps={{
              fontSize: 21,
            }}
            subheaderTypographyProps={{
              fontSize: 15,
            }}
            avatar={
              <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
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
                      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e9558643086527.57e2ba0364c8c.jpg"
                    )
                  }
                />
              </IconButton>
            }
            // title={product.name}
            title="Sneaker Stash"
            subheader="Date: Nike"
          />
          <CardMedia
            component="img"
            height="400"
            image="https://cyclestyle.net/imgs/ogp_f/172218.jpg"
            alt="sneaker"
          />
          <CardContent className="order-content">
            <div>
              <span>#Adidas #New #Sneaker_Stash</span>
            </div>
            <div>
              {" "}
              Wolaa..!! 🤯 There is new nike sneaker in the town,so hold up your
              seat buddies we are going launch Nike Electric 2.0 soon 🤩. So,
              pre-order now your #Nike_Electric_2.0.
            </div>
          </CardContent>
        </Card>
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
                <img
                  src="/assets/images/valley.jpeg"
                  alt=""
                  height="50px"
                  width="50px"
                />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <KeyboardDoubleArrowRightIcon
                  className="order-linkbutton"
                  sx={{ fontSize: 38 }}
                  color="secondary"
                  onClick={() =>
                    openModal("https://wallpaper.dog/large/17100124.jpg")
                  }
                />
              </IconButton>
            }
            // title={product.name}
            title="Sneaker Stash"
            subheader="Date: Nike"
          />
          <CardMedia
            component="img"
            height="400"
            image="https://th.bing.com/th/id/R.093407407bb19fa16b3e0c81944b4a4d?rik=J5Ea3HDP4E5uuw&riu=http%3a%2f%2fimages.solecollector.com%2fcomplex%2fimage%2fupload%2fduquldikbquk4srv1qd4.jpg&ehk=ZVvrHsAZuQhabp%2bPJ78kJQdpziWS5ZGrrAmg8sqeTw0%3d&risl=&pid=ImgRaw&r=0"
            alt="sneaker"
          />
          <CardContent className="order-content">
            <div>
              <span>#Adidas #New #Sneaker_Stash</span>
            </div>
            <div>
              {" "}
              Wolaa..!! 🤯 There is new nike sneaker in the town,so hold up your
              seat buddies we are going launch Nike Electric 2.0 soon 🤩. So,
              pre-order now your #Nike_Electric_2.0.
            </div>
          </CardContent>
        </Card> */}
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

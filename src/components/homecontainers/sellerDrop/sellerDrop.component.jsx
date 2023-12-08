import React from "react";
import "./sellerDrop.styles.scss";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SellerDropModal from "../sellerDropModal/sellerDropModal.component";

const SellerDropContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="sellerDropContainer">
      <h1># Seller Drop</h1>
      <div className="top-seller-drop">
        {" "}
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
                {/* {product.name.slice(0, 1)} */}S
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
                      "https://i.pinimg.com/originals/77/52/0b/77520bcc3fd917f45da9abc125148f8d.jpg"
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
            image="https://i.pinimg.com/originals/77/52/0b/77520bcc3fd917f45da9abc125148f8d.jpg"
            alt="sneaker"
          />
          <CardContent className="order-content">
            <div>
              <span>#Nike #New #Sneaker_Stash</span>
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
                {/* {product.name.slice(0, 1)} */}S
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
                {/* {product.name.slice(0, 1)} */}S
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
                {/* {product.name.slice(0, 1)} */}S
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
        </Card>
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

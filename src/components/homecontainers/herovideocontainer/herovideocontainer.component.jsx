import React from "react";
import "./herovideocontainer.styles.scss";

const HeroVideoContainer = () => {
  return (
    <div className="heroVideo-container">
      {" "}
      <div className="vid">
        <div className="hero-text">
          <p className="hero-one">Step up your style game with</p>
          <p className="hero-two"> Sneakers Hood </p>
          <p className="hero-three"> Where GenZ kicks In!</p>
        </div>
        <video
          src="/assets/video/nike1final.mp4"
          type="video/mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>
    </div>
  );
};

export default HeroVideoContainer;

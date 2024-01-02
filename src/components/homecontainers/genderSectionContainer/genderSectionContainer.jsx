import React from "react";
import "./genderSectionContainer.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategories } from "../../../features/productfiltersSlice";

const GenderSectionContainer = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="genderSectionContainer"
      data-aos="zoom-in-up"
      data-aos-offset="500"
      data-aos-duration="2700"
    >
      <h1>#Categories Section</h1>
      <div className="all-gender-boxes-container">
        <div className="single-gender-box">
          <video
            src="/assets/video/mens.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop
          ></video>

          <button
            className="single-gender-btn"
            onClick={() => dispatch(addCategories("men"))}
          >
            {" "}
            <Link to="product">Men's Sneakers</Link>
          </button>
        </div>
        <div className="single-gender-box">
          <video
            src="/assets/video/womens.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop
          ></video>

          <button
            className="single-gender-btn"
            onClick={() => dispatch(addCategories("women"))}
          >
            {" "}
            <Link to="product">Women's Sneakers</Link>
          </button>
        </div>
        <div className="single-gender-box">
          <video
            src="/assets/video/kids.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop
          ></video>

          <button
            className="single-gender-btn"
            onClick={() => dispatch(addCategories("kid"))}
          >
            <Link to="product">Kids's Sneakers</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderSectionContainer;

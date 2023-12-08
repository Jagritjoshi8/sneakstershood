import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./userMailForm.scss";
import FormInput from "../../components/authenticaton/userformInput.component";
import DiscountIcon from "@mui/icons-material/Discount";
import { setCouponSelected } from "../../features/cartSlice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { userMailQuery } from "../../features/authSlice";
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(255, 206, 247, 0.76)",
    color: "red",
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));

export const UserMailFormContainer = () => {
  const [isMailerClicked, setIsMailerClicked] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [query, setQuery] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userMailQuery({ name, email, query }));
    setName("");
    setEmail("");
    setQuery("");
    setIsMailerClicked(false);
  };

  return (
    <div className="user-mail-section">
      <div
        className="mailer-header"
        onClick={() => setIsMailerClicked(!isMailerClicked)}
      >
        <h2>Any Queries? Contact Now ▼</h2>
      </div>

      {isMailerClicked && (
        <div
          className="mailer-section"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          {" "}
          <form onSubmit={handleSubmit} className="mailer-center-section">
            <div>
              <FormInput
                label="Your Name"
                title="*required"
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter Your Name Here..."
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormInput
                label="Your Email"
                title="*required"
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Your Email Here..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="form-group">
                <label>Your Query:</label>

                <div className="input-info-container">
                  <textarea
                    id="query"
                    name="query"
                    placeHolder="Enter Your Query Here.."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    required
                    rows="4"
                  ></textarea>
                  <LightTooltip title="*required" arrow placement="top-start">
                    <InfoOutlinedIcon className="info-icon" />
                  </LightTooltip>
                </div>
              </div>
              <div className="button-warning-containers">
                <button type="submit">Send Query</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

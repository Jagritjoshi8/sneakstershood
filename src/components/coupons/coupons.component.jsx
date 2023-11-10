import React from "react";
// import { MdDiscount } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./coupons.styles.scss";
import DiscountIcon from "@mui/icons-material/Discount";
import { setCouponSelected } from "../../features/cartSlice";

// import { useUserData } from "../../../../contexts/UserDataProvider";

export const CouponsContainer = ({ cart }) => {
  const { couponSelected, cartTotalAmount } = cart;
  const [isCouponClicked, setIsCouponClicked] = useState(false);
  const dispatch = useDispatch();
  const handleSetCouponSelected = (coupon) => {
    dispatch(setCouponSelected(coupon));
  };
  //   const { userDataState } = useUserData();

  const couponsData = [
    {
      id: 1,
      name: "FESTIVE SEASON OFFER",
      description: "Get $20 off on a minimum purchase of $250",
      minimumPurchase: 250,
      amount: 20,
    },
    {
      id: 2,
      name: "BULK PURCHASE OFFER",
      description: "Get 20% off on a minimum purchase of $500",
      minimumPurchase: 500,
      discount: 20,
    },
  ];

  const couponHandler = (e, coupon) => {
    if (e.target.checked) {
      toast.success(`Woohoo! ${coupon.name} applied successfully!`);
      handleSetCouponSelected(coupon);
    } else {
      toast.success(`${coupon.name} removed!`);
      handleSetCouponSelected(coupon);
    }
  };

  return (
    <div
      className="coupons-section"
      data-aos="fade-left"
      data-aos-duration="2000"
    >
      <div
        className="coupon-header"
        onClick={() => setIsCouponClicked(!isCouponClicked)}
      >
        <DiscountIcon
          sx={{ fontSize: 28 }}
          color="secondary"
          className="cart-icon"
        />
        <h2>Apply Coupons ?</h2>
      </div>

      {isCouponClicked && (
        <div className="coupon-list-container">
          {couponsData.map((coupon) => {
            const { id, name, description, minimumPurchase, discount, amount } =
              coupon;
            return (
              <div key={id} className="coupon-card">
                <input
                  checked={couponSelected?.find((coupon) => coupon.id === id)}
                  onChange={(e) => couponHandler(e, coupon)}
                  disabled={cartTotalAmount <= minimumPurchase}
                  id={name}
                  type="checkbox"
                />
                <label htmlFor={name}>
                  <p className="name">{name}</p>
                  <p className="description">{description}</p>
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

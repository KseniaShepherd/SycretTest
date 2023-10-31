import React from "react";
import OrderForm from "../../features/OrderForm/OrderForm";
import image from "../../images/photo_2023-10-28_12-14-07-removebg-preview.png";

import style from "./PlacingOrderPage.module.scss";

const PlacingOrderPage = () => {
  return (
    <div className={style.placingOrderPage}>
      <div className={style.orderForm}>
        <OrderForm />
      </div>

      <img src={image} alt="girl" className={style.img}></img>
    </div>
  );
};

export default PlacingOrderPage;

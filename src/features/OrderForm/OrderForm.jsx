import React from "react";
import { Field, Form, Formik } from "formik";
import InputMask from "react-input-mask";
import style from "./OrderForm.module.scss";
import BasicButtons from "../../shared/Button/Button";
import { Link } from "react-router-dom";
import {
  selectSelectedCertificate,
  clearSelectedCertificate,
} from "../../store/reducers/certificateReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setName,
  setPhone,
  setMessage,
  setEmail,
  clearForm,
  submitUserDetails,
} from "../../store/reducers/userDetaillReducer";
const validateName = (value) => {
  if (!value) {
    return "Имя должно быть заполнено";
  }
};

const validatePhone = (value) => {
  if (!value) {
    return "Телефон должен быть заполнен";
  }
};
const validateEmail = (value) => {
  if (!value) {
    return "Почта должна быть заполнена";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Недействительный адрес электронной почты";
  }
  return undefined;
};

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCert = useSelector(selectSelectedCertificate);
  const userDetails = useSelector((state) => state.userDetails);
  return (
    <div>
      <div className={style.certificateInfo}>
        <h4>{selectedCert.NAME}</h4>
        <h4>
          Цена:{" "}
          {
            <div className={style.price}>
              <span className={style.oldPrice}> {selectedCert.PRICE}</span>
              <span className={style.newPrice}> {selectedCert.SUMMA}</span>
            </div>
          }{" "}
          руб.
        </h4>
      </div>

      <Formik
        initialValues={{
          name: userDetails.NAME || "",
          phone: userDetails.phone || "",
          message: userDetails.message || "",
          email: userDetails.email || "",
        }}
        onSubmit={() => { dispatch(submitUserDetails(userDetails))
          dispatch(clearForm());
          dispatch(clearSelectedCertificate());
          navigate("/payment");
        }}
      >
        {({
          errors,
          touched,
          setFieldValue,
          values,
          handleBlur,
          setFieldError,
        }) => (
          <Form className={style.form}>
            <label>Имя*</label>
            <Field
              className={style.inputStyle}
              name="name"
              validate={validateName}
              onBlur={(e) => {
                handleBlur(e);
                dispatch(setName(e.target.value));
              }}
            />
            {errors.name && touched.name && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.name}
              </div>
            )}
            <label>Телефон*</label>
            <InputMask
              mask="+7(999)999-99-99"
              alwaysShowMask={true}
              value={values.phone}
              onChange={(event) => {
                setFieldValue("phone", event.target.value);
                dispatch(setPhone(event.target.value));
              }}
              onBlur={(e) => {
                const error = validatePhone(e.target.value);
                if (error) {
                  setFieldError("phone", error);
                }
                handleBlur(e);
              }}
            >
              {(inputProps) => (
                <Field
                  {...inputProps}
                  className={style.inputStyle}
                  name="phone"
                  type="tel"
                  validate={validatePhone}
                />
              )}
            </InputMask>
            {errors.phone && touched.phone && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.phone}
              </div>
            )}
            <label>Сообщение</label>
            <Field
              className={style.inputStyle}
              name="message"
              onBlur={(e) => {
                handleBlur(e);
                dispatch(setMessage(e.target.value));
              }}
            />
            {errors.message && touched.message && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.message}
              </div>
            )}
            <label>Почта*</label>
            <Field
              className={style.inputStyle}
              name="email"
              validate={validateEmail}
              onBlur={(e) => {
                handleBlur(e);
                dispatch(setEmail(e.target.value));
              }}
            />
            {errors.email && touched.email && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.email}
              </div>
            )}
            <div className={style.buttonsBlock}>
              <Link to="/">
                <BasicButtons variant={"outlined"} text={"назад"} />
              </Link>
              <BasicButtons
                variant={"contained"}
                type={"submit"}
                text={"оплатить"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrderForm;

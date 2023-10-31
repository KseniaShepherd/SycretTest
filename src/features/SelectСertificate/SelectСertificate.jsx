import React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BasicButtons from "../../shared/Button/Button";
import style from "./SelectСertificate.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCertificates,
  setSelectedCertificate,
  selectSelectedCertificate,
} from "../../store/reducers/certificateReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(certificatName, selectedCertificatName, theme) {
  return {
    fontWeight:
      certificatName === selectedCertificatName
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  const certificates = useSelector((state) => state.certificates.certificates);
  const theme = useTheme();
  const selectedCert = useSelector(selectSelectedCertificate);
  const [certificate, setCertificat] = useState(selectedCert || "");
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCertificat(value);
    dispatch(setSelectedCertificate(value));
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickButton = () => {};

  return (
    <div className={style.selectForm}>
      <FormControl
        sx={{
          m: 1,
          width: 400,
          "@media (max-width:410px)": {
            width: "100vw",
          },
        }}
      >
        <InputLabel id="demo-multiple-name-label">Выберете товар</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={certificate}
          onChange={handleChange}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          input={<OutlinedInput label="Выберете товар" />}
          MenuProps={MenuProps}
        >
          {certificates.map((item) => (
            <MenuItem
              key={item.ID}
              value={item}
              style={getStyles(item.NAME, certificate?.NAME, theme)}
            >
              {item.NAME}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {certificate ? (
        <div className={style.certificateInfo}>
          <h2>{certificate.NAME} </h2>
          {certificate.DISCOUNT ? (
            <p>{`Скидка ${Math.round(
              certificate.DISCOUNT
            )} % на сертификат уже действует! Не упустите уникальную возможность приобрести ценный сертификат по специальной цене!`}</p>
          ) : (
            ""
          )}
          <h4>
            Цена:{" "}
            {
              <div className={style.price}>
                <span className={style.oldPrice}> {certificate.PRICE}</span>
                <span className={style.newPrice}> {certificate.SUMMA}</span>
              </div>
            }{" "}
            руб.
          </h4>
          <Link to="/order">
            <BasicButtons
              variant={"contained"}
              text={"КУПИТЬ"}
              onClick={handleClickButton}
            />
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

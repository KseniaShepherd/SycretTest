import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButtons({ variant, text, onClick, type }) {
  return (
    <Button
      style={{ width: "100%" }}
      variant={variant}
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
}

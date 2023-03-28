import { MobileDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const PrepDatePicker = ({ value, handleChange }) => {
  return (
    <MobileDatePicker
      closeOnSelect
      value={value}
      onChange={(newValue) => {
        handleChange(newValue);
      }}
      slotProps={{
        textField: {
          sx: {
            "& .MuiInputBase-input": {
              height: ".95rem",
              maxWidth: "7rem",
            },
          },
        },
      }}
    />
  );
};

export default PrepDatePicker;

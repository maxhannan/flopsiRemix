import { MobileDatePicker } from "@mui/x-date-pickers";

const PrepDatePicker = ({ value, handleChange }) => {
  return (
    <MobileDatePicker
      value={value}
      onChange={(newValue) => handleChange(newValue)}
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

import { Box, CircularProgress } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        w: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;

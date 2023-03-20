import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import RecipeStep from "./RecipeStep";

const RecipeStepSection = () => {
  const [steps, setSteps] = useState([]);

  const handleAddStep = () => {
    const stepNum = steps.length > 0 ? steps.slice(-1)[0].orderNum + 1 : 1;
    const newStep = {
      orderNum: stepNum,
      content: "",
    };
    setSteps([...steps, newStep]);
    console.log(steps);
  };
  return (
    <Stack spacing={1}>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ flex: "1" }} variant="h5">
          Steps
        </Typography>
      </Box>
      <Divider />
      {steps.map((s) => (
        <RecipeStep key={s.orderNum} stepNum={s.orderNum} />
      ))}
      <Button variant="outlined" color="secondary" onClick={handleAddStep}>
        Add Step
      </Button>
    </Stack>
  );
};

export default RecipeStepSection;

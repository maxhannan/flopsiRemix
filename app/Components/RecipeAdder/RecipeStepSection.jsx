import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { v4 } from "uuid";
import RecipeStep from "./RecipeStep";

const RecipeStepSection = ({ stepsList }) => {
  const [steps, setSteps] = useState(
    stepsList.map((s) => {
      return { content: s, orderNum: stepsList.indexOf(s) + 1, id: v4() };
    }) || [{ orderNum: 1, content: "", id: v4() }]
  );

  const handleAddStep = () => {
    const stepNum = steps.length > 0 ? steps.slice(-1)[0].orderNum + 1 : 1;
    const newStep = {
      orderNum: stepNum,
      content: "",
      id: v4(),
    };
    setSteps([...steps, newStep]);
  };
  const handleDelete = (id) => {
    const newSteps = steps.filter((i) => i.id !== id);
    const newNumSteps = newSteps.map((s) => {
      return { ...s, orderNum: newSteps.indexOf(s) + 1 };
    });
    setSteps(newNumSteps);
  };
  const handleChange = (e, id) => {
    const newSteps = steps.map((s) => {
      if (s.id === id) {
        return { ...s, content: e.target.value };
      }
      return s;
    });
    setSteps(newSteps);
  };
  return (
    <>
      <Stack spacing={1}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ flex: "1" }} variant="h5">
            Steps
          </Typography>
        </Box>
        <Divider />
      </Stack>
      <Stack spacing={2}>
        {steps.map((s) => (
          <RecipeStep
            key={s.orderNum}
            step={s}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
        ))}
        <Box>
          <Button
            startIcon={<MdAdd />}
            color="secondary"
            onClick={handleAddStep}
          >
            Add Step
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default RecipeStepSection;

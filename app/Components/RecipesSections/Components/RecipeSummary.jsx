import { Avatar, Card, CardActionArea, CardHeader } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { purple } from "@mui/material/colors";
import { MdOutlineChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RecipeSummary = () => {
  const navigate = useNavigate();
  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => navigate(`/app/recipes/${uuidv4()}`)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[400] }} aria-label="recipe">
              RF
            </Avatar>
          }
          action={<MdOutlineChevronRight />}
          title="Saffron Mayo"
          subheader="Sauces"
        />
      </CardActionArea>
    </Card>
  );
};

export default RecipeSummary;

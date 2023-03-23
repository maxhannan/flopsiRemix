import { Avatar, Card, CardActionArea, CardHeader } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "@remix-run/react";
import { MdOutlineChevronRight } from "react-icons/md";

const RecipeSummary = ({ recipe }) => {
  const navigate = useNavigate();
  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => navigate(`/app/recipes/${recipe.id}`)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[400] }} aria-label="recipe">
              {recipe.author.profile.firstName[0].toLowerCase() +
                recipe.author.profile.lastName[0].toLowerCase()}
            </Avatar>
          }
          action={<MdOutlineChevronRight />}
          title={recipe.name}
          subheader={recipe.category}
        />
      </CardActionArea>
    </Card>
  );
};

export default RecipeSummary;

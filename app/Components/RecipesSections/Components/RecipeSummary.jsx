import { useTheme } from "@emotion/react";
import { Avatar, Box, Card, CardActionArea, CardHeader } from "@mui/material";

import { useNavigate } from "@remix-run/react";
import { MdOutlineChevronRight } from "react-icons/md";

const RecipeSummary = ({ recipe }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ bgcolor: "background.default" }}>
      <CardActionArea onClick={() => navigate(`/app/recipes/${recipe.id}`)}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: theme.palette.secondary.main }}
                aria-label="recipe"
              >
                {recipe.author.profile.firstName[0].toLowerCase() +
                  recipe.author.profile.lastName[0].toLowerCase()}
              </Avatar>
            }
            title={recipe.name}
            subheader={recipe.category}
            subheaderTypographyProps={{ color: "primary" }}
          />
          <Box>
            <MdOutlineChevronRight
              color={theme.palette.secondary.main}
              size="2rem"
            />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default RecipeSummary;

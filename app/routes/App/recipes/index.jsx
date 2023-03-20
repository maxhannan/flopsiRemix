import SearchAndFilter from "../../../Components/RecipesSections/Components/SearchAndFilter";
import RecipeFeed from "../../../Components/RecipesSections/RecipeFeed";

const recipeIndex = () => {
  return (
    <>
      <SearchAndFilter />
      <RecipeFeed itemNum={5} />
    </>
  );
};

export default recipeIndex;

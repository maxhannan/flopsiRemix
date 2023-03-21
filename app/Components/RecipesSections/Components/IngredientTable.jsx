import { useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

export default function IngredientTable({ ingredients }) {
  const matches = useMediaQuery("(min-width:650px)");

  const columns = [
    {
      field: "ingredient",
      headerName: "Ingredient",
      width: !matches ? "180" : "255",
    },
    { field: "qty", headerName: "Qty", width: !matches ? "55" : "100" },
    { field: "unit", headerName: "Unit", width: !matches ? "30" : "75" },
  ];

  const rows = ingredients.map((i) => {
    return { ...i, id: uuidv4() };
  });

  const autoH = rows.length > 8 ? false : true;
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        sx={{ height: "65vh" }}
        autoHeight={autoH}
        rows={rows}
        columns={columns}
        pagination="false"
        checkboxSelection
        onCellClick={(e) => console.log(e)}
        hideFooter
      />
    </div>
  );
}

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, TableHead, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { useTheme } from "@emotion/react";

export default function NewIngredientTable({ rows, scale }) {
  const theme = useTheme();
  console.log(theme.palette.secondary);
  if (rows) {
    return (
      <TableContainer
        sx={{ bgcolor: "background.default" }}
        component={Paper}
        variant="outlined"
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Ingredient</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.ingredient}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell padding="checkbox" component="th" scope="row">
                    <Checkbox />
                  </TableCell>
                  <TableCell
                    onClick={() => console.log(row.ingredient)}
                    sx={{
                      fontSize: "1rem",
                      cursor: row.linkId ? "pointer" : "-moz-initial",
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.linkId ? (
                      <Typography
                        component={Link}
                        to={`/app/recipes/${row.linkId}`}
                        color="secondary"
                      >
                        {row.ingredient}
                      </Typography>
                    ) : (
                      row.ingredient
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1rem" }} align="right">
                    {row.qty * scale}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1rem" }} align="right">
                    {row.unit}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, IconButton, TableHead } from "@mui/material";
import { MdEdit } from "react-icons/md";

import { purple } from "@mui/material/colors";

export default function NewIngredientTable({ rows }) {
  console.log(rows);
  if (rows) {
    return (
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ maxHeight: "65vh" }}
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
                    sx={{
                      fontSize: "1rem",
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.ingredient}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1rem" }} align="right">
                    {row.qty}
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

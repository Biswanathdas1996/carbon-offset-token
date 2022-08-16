import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  allStates,
  badgeUI,
  assetHavingImage,
} from "../../utils/tokenListingState";

export default function BasicTable() {
  return (
    <TableContainer component={Paper} style={{ marginLeft: 30 }}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Color code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allStates.map((row) => (
            <TableRow
              key={row.type}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: badgeUI(row.id) }}
              >
                {assetHavingImage.includes(row.id) ? (
                  <img src={badgeUI(row.id)} alt="grass" height="30" />
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

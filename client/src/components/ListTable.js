import React from "react";
import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TextField,
  InputAdornment,
} from "@material-ui/core";

const currencies = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BTC: "฿",
  JPY: "¥",
};

const ListTable = (props) => {
  return (
    <TableContainer style={{ padding: "10px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right" width="40%">
                {item.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;

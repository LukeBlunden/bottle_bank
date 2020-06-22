import React from "react";
import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@material-ui/core";
import ListTableRow from "./ListTableRow";

const currencies = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BTC: "฿",
  JPY: "¥",
};

const ListTable = (props) => {
  const tableRows = props.categories.map((category) => (
    <ListTableRow
      currencySymbol={currencies[props.currency]}
      name={category.name}
      expenseLog={props.expenseLog}
      key={category.name}
    />
  ));

  return (
    <TableContainer style={{ padding: "10px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Item</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;

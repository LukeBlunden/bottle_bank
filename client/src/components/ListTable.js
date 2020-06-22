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
  const rows = props.categories.map((category) => {
    let expenses = props.expenseLog.filter(
      (expense) => expense.category === category.name
    );
    const total = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount, 10),
      0
    );
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>{category.name}</TableCell>
          <TableCell>{total}</TableCell>
        </TableRow>
        <TableRow>
          {expenses.map((expense) => (
            <p style={{ color: "red" }}>
              {expense.description} - {expense.amount}
            </p>
          ))}
        </TableRow>
      </React.Fragment>
    );
  });

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
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;

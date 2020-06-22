import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  TableBody,
  Table,
  TableHead,
} from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

const ListTableRow = ({ name, expenseLog, currencySymbol }) => {
  const [open, setOpen] = useState(false);

  const expenses = expenseLog.filter((expense) => expense.category === name);
  const total = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount, 10),
    0
  );

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>
          {currencySymbol}
          {total}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.selectedDate}>
                      <TableCell>
                        {format(parseISO(expense.selectedDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        {currencySymbol}
                        {expense.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ListTableRow;

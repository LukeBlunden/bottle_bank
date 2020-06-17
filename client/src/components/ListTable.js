import React from "react";
import { Table, TableContainer, TableCell } from "@material-ui/core";

const ListTable = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>Item</TableCell>
          <TableCell>Total</TableCell>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default ListTable;

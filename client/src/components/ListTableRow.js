import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import styled from "styled-components";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

const OpenTable = styled.div`
  display: ${(props) => (props.open ? "initial" : "none")};
`;

const InnerTable = styled.table`
  display: grid;
  grid-template-columns:
    minmax(4.5rem, 1fr)
    minmax(5rem, 100%)
    minmax(3.5rem, 1fr);
  width: 100%;
  padding-left: 2rem;
  text-align: left;
  /* background-color: #f5c892; */

  & > thead,
  & > tbody {
    display: contents;

    & > tr {
      display: contents;

      & > * {
        padding: 0.4rem 0;
      }

      /* & > *:last-child {
        text-align: right;
      } */
    }
  }
`;

const ListTableRow = ({ name, expenseLog, currencySymbol }) => {
  const [open, setOpen] = useState(false);

  const expenses = expenseLog.filter((expense) => expense.category === name);
  const total = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount, 10),
    0
  );

  return (
    <React.Fragment>
      <tr>
        <td onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </td>
        <td>{name}</td>
        <td>
          {currencySymbol}
          {total}
        </td>
      </tr>
      <tr>
        <td style={{ gridColumn: "1 / span 3" }}>
          <OpenTable open={open}>
            <InnerTable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.selectedDate}>
                    <td>
                      {format(parseISO(expense.selectedDate), "dd/MM/yy")}
                    </td>
                    <td>{expense.description}</td>
                    <td>
                      {currencySymbol}
                      {expense.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </InnerTable>
          </OpenTable>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ListTableRow;

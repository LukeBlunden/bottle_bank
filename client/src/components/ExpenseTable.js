import React from "react";
import styled from "styled-components";
import ExpenseTableRow from "./ExpenseTableRow";

const OuterTable = styled.table`
  display: grid;
  grid-template-columns: 2rem minmax(5rem, 100%) minmax(3.5rem, 1fr);
  max-width: 100%;
  /* padding: 1rem; */
  text-align: left;

  & > thead,
  & > tbody {
    display: contents;

    & > tr {
      display: contents;

      /* & > *:last-child {
        text-align: right;
      } */
    }
  }
`;

const currencies = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BTC: "฿",
  JPY: "¥",
};

const ExpenseTable = (props) => {
  const tableRows = props.categories.map((category) => (
    <ExpenseTableRow
      currencySymbol={currencies[props.currency]}
      name={category.name}
      expenseLog={props.expenseLog}
      key={category.name}
    />
  ));

  return (
    <div>
      <OuterTable>
        <thead>
          <tr>
            <th />
            <th>Item</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </OuterTable>
    </div>
  );
};

export default ExpenseTable;

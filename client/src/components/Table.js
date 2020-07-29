import React from "react";
import styled from "styled-components";
import TableRow from "./TableRow";

const TableContainer = styled.div`
  padding: 10px;
`;

const OuterTable = styled.table`
  display: grid;
  grid-template-columns: 3rem minmax(5rem, 100%) minmax(3.5rem, 1fr);
  max-width: 100%;
  text-align: left;
  border: 3px solid var(--col-dark-grey);
  border-radius: var(--border-radius-card);

  & > thead,
  & > tbody {
    display: contents;

    & > tr {
      display: contents;

      & > th {
        padding: 4px 0;
        background-color: var(--col-darkest-bg);
      }

      & > th.headcell {
        padding: 4px 0;
        background-color: var(--col-darker-bg);
        /* border-bottom: 2px solid var(--col-dark-grey); */
      }

      & > th:first-child {
        text-align: center;
      }
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

const Table = (props) => {
  const tableRows = props.categories.map((category) => (
    <TableRow
      currencySymbol={currencies[props.currency]}
      name={category.name}
      log={props.log}
      key={category.name}
    />
  ));

  return (
    <TableContainer>
      <OuterTable>
        <thead>
          <tr>
            <th
              style={{ borderRadius: "var(--border-radius-card-small) 0 0 0" }}
            />

            <th>Item</th>
            <th
              style={{ borderRadius: "0 var(--border-radius-card-small) 0 0" }}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </OuterTable>
    </TableContainer>
  );
};

export default Table;

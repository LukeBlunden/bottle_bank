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

const TableRow = ({ name, log, currencySymbol }) => {
  const [open, setOpen] = useState(false);

  const items = log.filter((item) => item.category === name);
  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.amount, 10),
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
                {items.map((item) => (
                  <tr key={item.selectedDate}>
                    <td>{format(parseISO(item.selectedDate), "dd/MM/yy")}</td>
                    <td>{item.description}</td>
                    <td>
                      {currencySymbol}
                      {item.amount}
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

export default TableRow;

import React, { useState } from "react";
import { format, parseISO, isThisMonth } from "date-fns";
import styled from "styled-components";

const OpenTable = styled.div`
  display: ${(props) => (props.open ? "initial" : "none")};
`;

const InnerTable = styled.table`
  display: grid;
  grid-template-columns:
    minmax(3rem, 1fr)
    minmax(5rem, 100%)
    minmax(3.5rem, 1fr);
  align-items: stretch;
  width: 100%;
  text-align: left;

  & > thead,
  & > tbody {
    display: contents;

    & > tr {
      display: contents;

      & > * {
        padding: 3px 0;
      }

      & > td.date {
        font-size: 0.8rem;
        line-height: 1.4rem;
        text-align: center;
      }
    }
  }
`;

const TableRow = ({ name, log, currencySymbol }) => {
  const [open, setOpen] = useState(false);

  const items = log.filter(
    (item) => item.category === name && isThisMonth(new Date(item.selectedDate))
  );
  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.amount, 10),
    0
  );

  return (
    <React.Fragment>
      <tr className="head">
        <th onClick={() => setOpen(!open)} className="headcell arrow">
          {/* {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />} */}
          {open ? "⯅" : "⯆"}
        </th>
        <th className="headcell">{name}</th>
        <th className="headcell">
          {currencySymbol}
          {total}
        </th>
      </tr>
      <tr>
        <td style={{ gridColumn: "1 / span 3" }}>
          <OpenTable open={open}>
            <InnerTable>
              {/* <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead> */}
              <tbody>
                {items.map((item) => (
                  <tr key={item.selectedDate}>
                    <td className="date">
                      {format(parseISO(item.selectedDate), "dd/MM")}
                    </td>
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

import React, { useState } from "react";
import { format, parseISO, isThisMonth } from "date-fns";
import styled from "styled-components";

import Icon from "./UI/Icon";

const Svg = styled(Icon)`
  color: var(--col-dark-grey);
  opacity: ${(props) => (props.clickable ? "1" : "0.3")};
  cursor: ${(props) => (props.clickable ? "pointer" : "not-allowed")};
  ${(props) => (props.clickable ? null : "pointer-events: none")};
  margin-bottom: 2px;
`;

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
    (item) =>
      item.category === name &&
      (isThisMonth(new Date(item.selectedDate)) || item.recurring)
  );
  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.amount, 10),
    0
  );

  return (
    <React.Fragment>
      <tr className="head">
        <th onClick={() => setOpen(!open)} className="headcell arrow">
          {open ? (
            <Svg width="15" height="8" viewBox="0 0 20 11">
              <path
                d="M19.708 10.634c.39-.405.39-1.06 0-1.464L11.444.607a1.95 1.95 0 00-2.827 0L.292 9.232c-.385.4-.39 1.048-.01 1.454a.976.976 0 001.425.01l7.617-7.893a.975.975 0 011.414 0l7.557 7.83a.974.974 0 001.413 0"
                fill="currentColor"
                fillRule="evenodd"
              />
            </Svg>
          ) : (
            <Svg
              width="15"
              height="8"
              viewBox="0 0 20 11"
              clickable={items.length > 0}
            >
              <path
                d="M.292.366c-.39.405-.39 1.06 0 1.464l8.264 8.563c.78.81 2.047.81 2.827 0l8.325-8.625c.385-.4.39-1.048.01-1.454a.976.976 0 00-1.425-.011l-7.617 7.893a.975.975 0 01-1.414 0L1.705.366a.974.974 0 00-1.413 0"
                fill="currentColor"
                fillRule="evenodd"
              />
            </Svg>
          )}
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

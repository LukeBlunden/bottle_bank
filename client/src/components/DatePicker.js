import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import Calendar from "react-calendar";

const DatePickerPanel = styled.div`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: var(--border-primary) solid var(--col-dark-grey);
  outline: none;
  background-color: var(--col-main-bg);
  margin: 0 -0.5rem;

  & > p {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const CalendarContainer = styled.div`
  padding-top: ${(props) => (props.open ? "10px" : "0")};
  overflow: hidden;
  text-align: center;

  & .calendar {
    max-height: ${(props) => (props.open ? "13rem" : "0")};

    & button {
      background-color: white;
      border: none;
      padding: 5px;
      border-radius: 0;
      outline: none;
      /* width: 100%; */

      &:focus {
        background-color: var(--col-main-pos);
      }
    }

    & input {
    }

    & abbr {
    }
  }
`;

const DatePicker = ({ value, onChange }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <React.Fragment>
      <DatePickerPanel onClick={() => setCalendarOpen(!calendarOpen)}>
        <p>
          <span>{format(value, "dd/MM/yy")}</span>
          <span role="img" aria-label="date picker">
            📅
          </span>
        </p>
      </DatePickerPanel>
      <CalendarContainer open={calendarOpen}>
        <Calendar
          className="calendar"
          onChange={(date) => onChange(date)}
          value={value}
        />
      </CalendarContainer>
    </React.Fragment>
  );
};

export default DatePicker;

import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import Calendar from "react-calendar";

const DatePickerPanel = styled.div`
  display: flex;
`;

const CalendarContainer = styled.div`
  padding: ${(props) => (props.open ? "10px" : "0")};
  overflow: hidden;

  & .calendar {
    max-height: ${(props) => (props.open ? "12rem" : "0")};
    & button {
      background-color: white;
      border: none;
      padding: 5px;
    }

    & abbr {
      /* color: white; */
    }
  }
`;

const DatePicker = ({ value, onChange }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <React.Fragment>
      <DatePickerPanel onClick={() => setCalendarOpen(!calendarOpen)}>
        <p>{format(value, "dd/MM/yy")}</p>
        <p>
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

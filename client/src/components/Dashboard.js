import React, { useEffect, useState } from "react";
import { isThisMonth, differenceInCalendarMonths } from "date-fns";
import styled from "styled-components";
import Theme from "../theme/Theme";
import { useSelector } from "react-redux";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const StackedCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 10px 20px;
  padding: var(--border-primary);
  border-radius: 15px;
  background-color: var(--col-dark-grey);
  font-weight: bold;
`;

const InfoPanel = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;

  &:first-child {
    border-radius: var(--border-radius-card) var(--border-radius-card) 0 0;
  }

  &:last-child {
    border-radius: 0 0 var(--border-radius-card) var(--border-radius-card);
  }

  &:not(:last-child) {
    margin-bottom: var(--border-primary);
  }
`;

const getTotal = (data) => {
  return data.reduce(
    (acc, group) => {
      for (let log of group.log) {
        if (isThisMonth(new Date(log.selectedDate)) || log.recurring) {
          acc.current += parseFloat(log.amount, 10);
        } else if (log.recurring) {
          acc.current += parseFloat(log.amount, 10);
          acc.past +=
            parseFloat(log.amount, 10) *
            differenceInCalendarMonths(new Date(), new Date(log.selectedDate));
        } else {
          acc.past += parseFloat(log.amount, 10);
        }
      }
      return acc;
    },
    { current: 0, past: 0 }
  );
};

const Dashboard = (props) => {
  const [incomeTotal, setIncomeTotal] = useState({ current: 0, past: 0 });
  const [expensesTotal, setExpensesTotal] = useState({ current: 0, past: 0 });

  const [difference, setDifference] = useState({ current: 0, past: 0 });

  const { income } = useSelector((state) => state.income);

  const { expenses } = useSelector((state) => state.expenses);

  // Reduce income data for current month and past months
  useEffect(() => {
    setIncomeTotal(getTotal(income));
  }, [income]);

  // Reduce income data for current month and past months
  useEffect(() => {
    setExpensesTotal(getTotal(expenses));
  }, [expenses]);

  // Calculates income and expense differences for simpler referencing in jsx
  useEffect(() => {
    setDifference((difference) => ({
      past: incomeTotal.past - expensesTotal.past,
      current: incomeTotal.current - expensesTotal.current,
    }));
  }, [incomeTotal, expensesTotal]);

  return (
    <Theme>
      <React.Fragment>
        <GridContainer>
          <StackedCard>
            <InfoPanel color="var(--col-dark-bg)">
              <p>Current Savings</p>
              <p>{`£${(difference.past + difference.current).toFixed(2)}`}</p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-neg)">
              <p>Monthly Expenses</p>
              <p>{`-£${expensesTotal.current.toFixed(2)}`}</p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-pos)">
              <p>Monthly Income</p>
              <p>{`+£${incomeTotal.current.toFixed(2)}`}</p>
            </InfoPanel>
            <InfoPanel color="var(--col-dark-bg)">
              <p>Initial Savings</p>
              <p>{`£${difference.past.toFixed(2)}`}</p>
            </InfoPanel>
          </StackedCard>

          <StackedCard>
            <InfoPanel color="var(--col-main-pos)">
              <p>Monthly Performance</p>
              <p>
                {difference.past > difference.past + difference.current
                  ? "-"
                  : "+"}
                {(
                  (Math.abs(
                    difference.past - (difference.past + difference.current)
                  ) /
                    difference.past) *
                  100
                ).toFixed(2)}
                %
              </p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-pos)">
              <p>Annual Performance</p>
              <p>+0%</p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-pos)">
              <p>Income Spent</p>
              <p>
                {incomeTotal.current === 0
                  ? "No Income"
                  : (
                      (expensesTotal.current / incomeTotal.current) *
                      100
                    ).toFixed(2) + "%"}
              </p>
            </InfoPanel>
          </StackedCard>
        </GridContainer>
      </React.Fragment>
    </Theme>
  );
};

export default Dashboard;

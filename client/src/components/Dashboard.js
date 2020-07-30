import React, { useEffect, useState } from "react";
import { isThisMonth } from "date-fns";
import styled from "styled-components";
import Theme from "../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "../actions/incomeActions";
import { getExpenses } from "../actions/expensesActions";

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

const Dashboard = (props) => {
  const [incomeTotal, setIncomeTotal] = useState(null);
  const [expensesTotal, setExpensesTotal] = useState(null);

  const dispatch = useDispatch();
  const { income, loading: incomeLoading } = useSelector(
    (state) => state.income
  );
  const { expenses, loading: expensesLoading } = useSelector(
    (state) => state.expenses
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (income.length === 0) {
      dispatch(getIncome(user._id));
    }
    if (expenses.length === 0) {
      dispatch(getExpenses(user._id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!incomeLoading) {
      const newTotal = income.reduce((acc, group) => {
        for (let log of group.log) {
          acc += parseFloat(log.amount, 10);
        }
        return acc;
      }, 0);
      setIncomeTotal(newTotal);
    }
  }, [incomeLoading, income]);

  useEffect(() => {
    if (!expensesLoading) {
      const newTotal = expenses.reduce((acc, group) => {
        for (let log of group.log) {
          if (isThisMonth(new Date(log.selectedDate))) {
            acc += parseFloat(log.amount, 10);
          }
        }
        return acc;
      }, 0);
      setExpensesTotal(newTotal);
    }
  }, [expensesLoading, expenses]);

  return (
    <Theme>
      <React.Fragment>
        <h1>Dashboard</h1>
        <GridContainer>
          <StackedCard>
            <InfoPanel color="var(--col-dark-bg)">
              <p>Current Savings</p>
              <p>$2000.00</p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-neg)">
              <p>Monthly Expenses</p>
              <p>{expensesTotal ? `-$${expensesTotal.toFixed(2)}` : "..."}</p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-pos)">
              <p>Monthly Income</p>
              <p>{incomeTotal ? `+$${incomeTotal.toFixed(2)}` : "..."}</p>
            </InfoPanel>
            <InfoPanel color="var(--col-dark-bg)">
              <p>Initial Savings</p>
              <p>$1000.00</p>
            </InfoPanel>
          </StackedCard>

          <StackedCard>
            <InfoPanel color="var(--col-main-pos)">
              <p>Monthly Performance</p>
              <p>+10%</p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-pos)">
              <p>Annual Performance</p>
              <p>+50%</p>
            </InfoPanel>
          </StackedCard>
        </GridContainer>
      </React.Fragment>
    </Theme>
  );
};

export default Dashboard;

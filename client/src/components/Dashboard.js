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
  const [incomeTotal, setIncomeTotal] = useState({ current: 0, past: 0 });
  const [expensesTotal, setExpensesTotal] = useState({ current: 0, past: 0 });

  const [difference, setDifference] = useState({ current: 0, past: 0 });

  const dispatch = useDispatch();

  const { income, loading: incomeLoading } = useSelector(
    (state) => state.income
  );

  const { expenses, loading: expensesLoading } = useSelector(
    (state) => state.expenses
  );

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (income.length === 0 && isLoading === false) {
      dispatch(getIncome(user._id));
    }
    if (expenses.length === 0 && isLoading === false) {
      dispatch(getExpenses(user._id));
    }
  }, [dispatch, income.length, expenses.length, user._id, isLoading]);

  useEffect(() => {
    if (!incomeLoading) {
      const newTotal = income.reduce((acc, group) => {
        for (let log of group.log) {
          if (isThisMonth(new Date(log.selectedDate)) || log.recurring) {
            acc.current += parseFloat(log.amount, 10);
          } else {
            acc.past += parseFloat(log.amount, 10);
          }
        }
        return acc;
      }, incomeTotal);
      setIncomeTotal(newTotal);
    }
  }, [incomeLoading, income, incomeTotal]);

  useEffect(() => {
    if (!expensesLoading) {
      const newTotal = expenses.reduce((acc, group) => {
        for (let log of group.log) {
          if (isThisMonth(new Date(log.selectedDate)) || log.recurring) {
            acc.current += parseFloat(log.amount, 10);
          } else {
            acc.past += parseFloat(log.amount, 10);
          }
        }
        return acc;
      }, expensesTotal);
      setExpensesTotal(newTotal);
    }
  }, [expensesLoading, expenses, expensesTotal]);

  // This is basically just rerendering the page and recalcing the totals - need to fix
  useEffect(() => {
    setDifference((difference) => ({
      ...difference,
      past: incomeTotal.past - expensesTotal.past,
    }));
  }, [incomeTotal.past, expensesTotal.past]);

  return (
    <Theme>
      <React.Fragment>
        {/* <h1>Dashboard</h1> */}
        <GridContainer>
          <StackedCard>
            <InfoPanel color="var(--col-dark-bg)">
              <p>Current Savings</p>
              <p>
                {`£${(
                  incomeTotal.past -
                  expensesTotal.past +
                  (incomeTotal.current - expensesTotal.current)
                ).toFixed(2)}`}
              </p>
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
              <p>{`£${(incomeTotal.past - expensesTotal.past).toFixed(2)}`}</p>
            </InfoPanel>
          </StackedCard>

          <StackedCard>
            <InfoPanel color="var(--col-main-pos)">
              <p>Monthly Performance</p>
              <p>
                {incomeTotal.past - expensesTotal.past >
                incomeTotal.past -
                  expensesTotal.past +
                  (incomeTotal.current - expensesTotal.current)
                  ? "-"
                  : "+"}
                {(
                  (Math.abs(
                    incomeTotal.past -
                      expensesTotal.past -
                      (incomeTotal.past -
                        expensesTotal.past +
                        incomeTotal.current -
                        expensesTotal.current)
                  ) /
                    (incomeTotal.past - expensesTotal.past)) *
                  100
                ).toFixed(2)}
                %
              </p>
            </InfoPanel>
            <InfoPanel color="var(--col-main-pos)">
              <p>Annual Performance</p>
              <p>+0%</p>
            </InfoPanel>
          </StackedCard>
        </GridContainer>
      </React.Fragment>
    </Theme>
  );
};

export default Dashboard;

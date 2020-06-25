import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../theme/Theme";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const StackedCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 10px 20px;
  padding: 10px;
  border-radius: 15px;
  background-color: #2f2d52;
`;

const InfoPanel = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  border-radius: 10px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Dashboard = (props) => {
  return (
    <Theme>
      <React.Fragment>
        <h1>Dashboard</h1>
        <GridContainer>
          <StackedCard>
            <InfoPanel color="#deddec">
              <p>Current Savings</p>
              <p>$2000.00</p>
            </InfoPanel>
            <InfoPanel color="#f5c892">
              <p>Monthly Expenses</p>
              <p>-$500.00</p>
            </InfoPanel>
            <InfoPanel color="#b2f3da">
              <p>Monthly Income</p>
              <p>+$1500.00</p>
            </InfoPanel>
            <InfoPanel color="#deddec">
              <p>Initial Savings</p>
              <p>$1000.00</p>
            </InfoPanel>
          </StackedCard>

          <StackedCard>
            <InfoPanel color="#b2f3da">
              <p>Monthly Performance</p>
              <p>+10%</p>
            </InfoPanel>
            <InfoPanel color="#b2f3da">
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

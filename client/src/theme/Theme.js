import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    primaryGreen: "#b2f3da",

    lightGrey: "#b8bbbc",
    medLightGrey: "#888e91",
    medGrey: "#6b7377",
    medDarkGrey: "#4e565a",
    darkGrey: "#33393c",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;

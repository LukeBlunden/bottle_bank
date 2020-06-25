import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primaryGreen: "#b2f3da",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;

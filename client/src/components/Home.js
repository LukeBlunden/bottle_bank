import React from "react";

import { useSelector } from "react-redux";

const Home = (props) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Hello {isAuthenticated ? user.name.replace(/ .*/, "") : "Guest"}</h1>
    </div>
  );
};

export default Home;

import React from "react";

const css = { margin: "0 auto", textAlign: "center" };

const ErrorNotification = ({ text }) => (
  <h1 style={css}>
    WHOOPS, SOMETHING WENT WRONG! <br />
    {text}
  </h1>
);

export default ErrorNotification;

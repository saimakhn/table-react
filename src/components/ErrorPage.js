import "./DataTable.css";
import React, { useState } from "react";

const ErrorPage = ({ err }) => {
  return (
    <div className="error-wrapper">
      <div className="error-message">
      {err}
      </div>
      <div className="error-icon">&#9888;</div>
    </div>
  );
};

export default ErrorPage;

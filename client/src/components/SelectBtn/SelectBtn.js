import React from "react";
import "./SelectBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SelectBtn = props => (
  <span className="select-btn" {...props}>
    Select
  </span>
);

export default SelectBtn;

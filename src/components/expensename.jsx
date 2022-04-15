import React, { Component } from "react";

class ExpenseName extends Component {
  state = {};
  render() {
    return <span className="header_description">{this.props.expenseName}</span>;
  }
}

export default ExpenseName;

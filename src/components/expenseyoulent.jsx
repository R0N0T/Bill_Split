import React, { Component } from "react";

class ExpenseYouLent extends Component {
  state = {};
  render() {
    return <span className="positive">Rs. {this.props.youLent}</span>;
  }
}

export default ExpenseYouLent;

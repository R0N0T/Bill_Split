import React, { Component } from "react";

class ExpenseYouPaid extends Component {
  state = {};
  render() {
    return <span className="number">Rs. {this.props.youPaid}</span>;
  }
}

export default ExpenseYouPaid;

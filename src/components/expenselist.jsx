import React, { Component } from "react";
import ExpenseName from "./expensename";
import ExpenseYouPaid from "./expenseyoupaid";
import ExpenseYouLent from "./expenseyoulent";
import AddGroup from "../addgroupcontroller";

class ExpenseList extends Component {
  deleteExpense(currentExpense, grpExpense) {
    let lent = currentExpense["youLent_" + this.props.id];
    let totalOwed = grpExpense.owed;
    let grpFriends = grpExpense.friends_name;
    let memCount = currentExpense["members_count"]; //grpExpense.members_count;
    let expenseId = currentExpense["id"];
    totalOwed -= lent;
    let perLent = Number((lent / memCount).toFixed(2));

    for (let i = 0; i < grpFriends.length; i++) {
      if (expenseId >= grpFriends[i]["from_expense"]) {
        if (grpFriends[i]["owes_" + i] > 0) {
          grpFriends[i]["owes_" + i] = Number(
            (grpFriends[i]["owes_" + i] - perLent).toFixed(2)
          );
          if (grpFriends[i]["owes_" + i] <= 0) {
            grpFriends[i]["owes_" + i] = 0;
          }
        }
      }
    }

    AddGroup.deleteGrpExpense(
      totalOwed,
      grpFriends,
      currentExpense,
      grpExpense,
      this.props.id,
      () => alert("Expense Deleted!")
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="add_expense summary">
          <div className="main-block">
            <div className="date">
              {this.props.current_expense_data["onMonth"]}
              <div className="number">
                {this.props.current_expense_data["onDate"]}
              </div>
            </div>
            <div className="header_name">
              <ExpenseName
                key={this.props.id}
                expenseName={
                  this.props.current_expense_data["expense_" + this.props.id]
                }
              />
            </div>
          </div>
          <div className="cost">
            you paid <br />{" "}
            <ExpenseYouPaid
              key={this.props.id}
              youPaid={
                this.props.current_expense_data["youPaid_" + this.props.id]
              }
            />
          </div>
          <div className="you">
            you lent <br />
            <ExpenseYouLent
              key={this.props.id}
              youLent={
                this.props.current_expense_data["youLent_" + this.props.id]
              }
            />
          </div>
          <div className="delete_actions">
            <a
              href="/dashboard"
              className="delete"
              onClick={() =>
                this.deleteExpense(
                  this.props.current_expense_data,
                  this.props.current_group_data
                )
              }
            >
              x
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExpenseList;

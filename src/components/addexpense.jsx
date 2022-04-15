import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import AddGroup from "../addgroupcontroller";
//import { withRouter } from "react-router-dom";

class AddExpense extends Component {
  getMonth() {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return months[new Date().getMonth()];
  }

  addExpense = () => {
    let expenses = this.props.current_data.expenses;
    let expensesSize = expenses ? Object.keys(expenses).length : 0;
    let expenseName = this.refs.description.value;
    let totalAmount = this.refs.amount.value;
    let { members_count } = this.props.current_data;
    let amountPerHead = Number(
      (Number(totalAmount) / (Number(members_count) + 1)).toFixed(2)
    );

    let updateCurrentData = JSON.parse(JSON.stringify(this.props.current_data));
    console.log(this.props.current_data);
    let newExpense = {};
    newExpense["id"] = !expensesSize ? 0 : expenses[expensesSize - 1]["id"] + 1;
    newExpense["members_count"] = members_count;
    newExpense["expense_" + expensesSize] = expenseName;
    newExpense["youPaid_" + expensesSize] = totalAmount;
    newExpense["youLent_" + expensesSize] = (
      totalAmount - amountPerHead
    ).toFixed(2);
    newExpense["onMonth"] = this.getMonth();
    newExpense["onDate"] = new Date().getDate();
    updateCurrentData.expenses.push(newExpense);
    for (var i = 0; i < updateCurrentData.friends_name.length; i++) {
      updateCurrentData.friends_name[i]["owes_" + i] = Number(
        (
          updateCurrentData.friends_name[i]["owes_" + i] + amountPerHead
        ).toFixed(2)
      );
      if (!expensesSize) {
        updateCurrentData.friends_name[i]["from_expense"] = expensesSize;
      }
    }
    //console.log(updateCurrentData.friends_name);

    updateCurrentData.owed = Number(
      (
        Number(updateCurrentData.owed) +
        Number((totalAmount - amountPerHead).toFixed(2))
      ).toFixed(2)
    );

    //this.setState({ current_data: updateCurrentData });
    AddGroup.setAddExpense(updateCurrentData, () => alert("Expense Added!"));

    this.refs.description.value = "";
    this.refs.amount.value = "";

    //this.props.history.push("/dashboard");
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>
              With{" "}
              <b>
                <i>you</i>
              </b>{" "}
              and all of:{" "}
              <b>
                <i>{this.props.group_name}</i>
              </b>
            </h6>
          </div>
          <div>
            <center>
              <span style={{ marginRight: "20px" }}>
                <i className="fa fa-arrow-down"></i>
              </span>
              <label>
                <i>Enter a description</i>
              </label>
            </center>
            <center>
              <input type="text" placeholder="Description" ref="description" />
            </center>
            <center>
              <input type="text" placeholder="Amount in Rs." ref="amount" />
            </center>
            <center>
              <label>
                <i>Enter amount</i>
              </label>{" "}
              <span style={{ marginLeft: "60px" }}>
                <i className="fa fa-arrow-up"></i>
              </span>
            </center>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addExpense}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddExpense;

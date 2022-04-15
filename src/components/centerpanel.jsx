import React, { Component } from "react";
import LeftPanel from "./leftpanel";
import RightPanel from "./rightpanel";
import AddExpense from "./addexpense";
//import Settleup from "./settleup";
import AddGroup from "../addgroupcontroller";
import ExpenseList from "./expenselist";
import AddFriends from "./addfriends";
import { Redirect } from "react-router-dom";
import FriendOwesDetails from "./friendowesdetails";

class CenterPanel extends Component {
  state = {
    showAddExpenseModal: false,
    showSettleupModal: false,
    showAddFrndsModal: false,
    showFrndOwesModal: false,
    group_data: JSON.parse(AddGroup.getGroups()),
    current_group_data: AddGroup.getCurrentGrpSwitch(),
    friendOwesToGrps: {}
  };

  componentDidMount() {
    console.log("Mounted");
  }

  setAddExpenseModalShow = e => {
    this.setState({
      showAddExpenseModal: e,
      group_data: JSON.parse(AddGroup.getGroups()),
      current_group_data: AddGroup.getCurrentGrpSwitch()
    });
  };

  setSettleupModalShow = e => {
    this.setState({ showSettleupModal: e });
  };

  setAddFrndsModalShow = e => {
    this.setState({
      showAddFrndsModal: e,
      group_data: JSON.parse(AddGroup.getGroups()),
      current_group_data: AddGroup.getCurrentGrpSwitch()
    });
  };

  setFrndOwesModalShow = e => {
    this.setState({
      showFrndOwesModal: e,
      group_data: JSON.parse(AddGroup.getGroups()),
      current_group_data: AddGroup.getCurrentGrpSwitch()
    });
  };

  display_data = group_data => {
    AddGroup.setCurrentGrpSwitch(group_data.group_name);
    this.setState({
      current_group_data: AddGroup.getCurrentGrpSwitch()
    });
  };

  displayExpenses = () => {
    let expenseList = [];
    for (let i = 0; i < this.state.current_group_data.expenses.length; i++) {
      expenseList.push(
        <ExpenseList
          key={i}
          id={i}
          current_group_data={this.state.current_group_data}
          current_expense_data={this.state.current_group_data.expenses[i]}
        />
      );
    }

    return expenseList;
  };

  displayFrndDetails = frndData => {
    this.setFrndOwesModalShow(true);
    console.log(frndData);
    this.setState({ friendOwesToGrps: frndData });
  };

  render() {
    if (!AddGroup.getCurrentGrpSwitch()) {
      alert("You haven't created any group yet...");
      return <Redirect to="/addgroup" />;
    }

    return (
      <React.Fragment>
        <div id="centerpanel">
          <LeftPanel
            group_data={this.state.group_data}
            handleClick={this.display_data}
            setAddFrndsModalShow={this.setAddFrndsModalShow}
            displayFrndDetails={this.displayFrndDetails}
          />
          <RightPanel current_group_data={this.state.current_group_data} />
          <div id="centercolumn">
            <div className="topbar">
              <h4>{this.state.current_group_data.group_name}</h4>
              <div className="actions">
                <button
                  className="button expense"
                  onClick={() => this.setAddExpenseModalShow(true)}
                >
                  Add an expense
                </button>
                {/*<button
                  className="button settleup"
                  onClick={() => this.setSettleupModalShow(true)}
                >
                  Settle up
                </button>*/}
              </div>
            </div>
            <div id="expenses">
              <div id="expenseslist">
                {/*<div id="no_expense_desc">
                  <img
                    className="no_expense_toy"
                    src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/empty-table-effed2a2e610373b6407d746cb95858f5d47329c8610bb70f1fd2040dfa35165.png"
                    alt=""
                  />
                  <div className="no_expense_content">
                    <h5>You have not added any expenses yet</h5>
                    <p className="sub_content">
                      To add a new expense, click the orange “Add an expense”
                      button.
                    </p>
                  </div>
    </div>*/}
                <div className="add_expense">
                  <div className="summary">{this.displayExpenses()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddExpense
          show={this.state.showAddExpenseModal}
          onHide={() => this.setAddExpenseModalShow(false)}
          group_name={this.state.current_group_data.group_name}
          current_data={this.state.current_group_data}
        />
        <AddFriends
          show={this.state.showAddFrndsModal}
          onHide={() => this.setAddFrndsModalShow(false)}
          current_data={this.state.current_group_data}
        />
        <FriendOwesDetails
          show={this.state.showFrndOwesModal}
          onHide={() => this.setFrndOwesModalShow(false)}
          group_data={this.state.group_data}
          owes_to_grps={this.state.friendOwesToGrps}
        />

        {/*<Settleup
          show={this.state.showSettleupModal}
          onHide={() => this.setSettleupModalShow(false)}
        />*/}
      </React.Fragment>
    );
  }
}

export default CenterPanel;

import React, { Component } from "react";
import FriendName from "./friendname";
import FriendOwes from "./friendowes";

class RightPanel extends Component {
  displayFriendDetails() {
    this.props.current_group_data.friends_name.map((f, index) => (
      <div>
        <FriendName key={index} id={index} friend_name={f["friend_" + index]} />
        <FriendOwes key={index} id={index} friend_owes={f["owes_" + index]} />
      </div>
    ));
  }

  render() {
    return (
      <div id="rightpanel">
        <div className="right_panel_content">
          <div id="group_balances" className="active">
            <h6>GROUP BALANCES</h6>
            <div className="group_summary">
              <div className="members">
                {this.props.current_group_data.friends_name.map((f, index) => (
                  <React.Fragment key={"friend_balance" + index}>
                    <FriendName
                      key={"friend_" + index}
                      id={index}
                      friend_name={f["friend_" + index]}
                    />
                    <FriendOwes
                      key={"owes_" + index}
                      id={index}
                      friend_owes={f["owes_" + index]}
                    />
                  </React.Fragment>
                ))}
                {/*<div className="personal_balance">Settled up</div>*/}

                {/*<div className="personal_balance owes_me">
                  gets back <span className="amount">$45.00</span>
    </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightPanel;

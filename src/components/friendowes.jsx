import React, { Component } from "react";

class FriendOwes extends Component {
  state = {};
  render() {
    return (
      <div className="personal_balance i_owe">
        owes <span className="amount">Rs.{this.props.friend_owes}</span>
      </div>
    );
  }
}

export default FriendOwes;

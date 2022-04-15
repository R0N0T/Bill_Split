import React, { Component } from "react";

class FriendName extends Component {
  render() {
    return <div className="name">{this.props.friend_name}</div>;
  }
}

export default FriendName;

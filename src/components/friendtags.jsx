import React, { Component } from "react";

class FriendName extends Component {
  render() {
    return (
      <div>
        <a
          /*href="www.splitwise.com"*/ className="group_name"
          onClick={() => this.props.handleClick(this.props.data)}
        >
          <i className="fa fa-user"></i> {this.props.data.name}
        </a>
      </div>
    );
  }
}

class FriendTags extends Component {
  displayFriends = () => {
    let friendsName = [];
    for (let i = 0; i < this.props.grpFriends.length; i++) {
      friendsName.push(
        <FriendName
          key={i}
          data={this.props.grpFriends[i]}
          handleClick={this.props.handleClick}
        />
      );
    }
    return friendsName;
  };

  render() {
    return <React.Fragment>{this.displayFriends()}</React.Fragment>;
  }
}

export default FriendTags;

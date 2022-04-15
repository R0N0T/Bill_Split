import React, { Component } from "react";

class TeamMemberList extends Component {
  state = {};
  render() {
    const style = {
      paddingTop: "10px",
      paddingBottom: "10px",
      marginTop: "2px"
    };
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Enter name"
          id={this.props.id}
          style={style}
        />
        <br />
        <br />
      </React.Fragment>
    );
  }
}

export default TeamMemberList;

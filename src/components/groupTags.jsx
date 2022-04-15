import React, { Component } from "react";

class GroupTags extends Component {
  render() {
    return (
      <a
        /*href="/dashboard"*/
        className="group_name open"
        onClick={() => this.props.handleClick(this.props.group_data)}
      >
        <i className="fa fa-tag"></i> {this.props.groupTags}
      </a>
    );
  }
}

export default GroupTags;

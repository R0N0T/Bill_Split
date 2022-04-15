import React, { Component } from "react";
import GroupTags from "./groupTags";
import FriendTags from "./friendtags";

class LeftPanel extends Component {
  displayGroups() {
    //let groups = JSON.parse(AddGroup.getGroups());
    let groupTags = [];
    if (this.props.group_data) {
      for (var i = 0; i < this.props.group_data.length; i++) {
        groupTags.push(
          <GroupTags
            key={i}
            id={i}
            groupTags={this.props.group_data[i].group_name}
            group_data={this.props.group_data[i]}
            handleClick={this.props.handleClick}
          />
        );
      }
    }

    return groupTags;
  }

  mapSimilarGrpMembers = () => {
    let belongsToGrps = [];
    for (let i = 0; i < this.props.group_data.length; i++) {
      for (let j = 0; j < this.props.group_data[i].friends_name.length; j++) {
        if (
          !belongsToGrps.some(
            user =>
              user.name ===
              this.props.group_data[i].friends_name[j]["friend_" + j]
          )
        ) {
          belongsToGrps.push({
            name: this.props.group_data[i].friends_name[j]["friend_" + j],
            belongsTo: new Array(this.props.group_data[i].group_name)
          });
        } else {
          for (let k = 0; k < belongsToGrps.length; k++) {
            if (
              belongsToGrps[k].name ===
              this.props.group_data[i].friends_name[j]["friend_" + j]
            ) {
              belongsToGrps[k].belongsTo.push(
                this.props.group_data[i].group_name
              );
              break;
            }
          }
        }
      }
    }
    console.log(belongsToGrps);
    return belongsToGrps;
  };

  displayGrpFriends = () => {
    let belongsToGrps = this.mapSimilarGrpMembers();

    if (belongsToGrps[0]) {
      return (
        <FriendTags
          grpFriends={belongsToGrps}
          handleClick={this.props.displayFrndDetails}
        />
      );
    }
  };

  render() {
    return (
      <div id="leftpanel">
        <div id="view_options">
          <a /*href="www.splitwise.com"*/ id="dashboard_option">Dashboard</a>
          <div className="group_tags">
            <div className="header">
              GROUPS
              <a id="add_group" href="/addgroup">
                + Add
              </a>
            </div>

            {this.displayGroups()}
          </div>

          <div className="group_tags">
            <div className="header">
              FRIENDS
              <a
                style={{ cursor: "pointer" }}
                id="add_group"
                /*href="/addgroup"*/ onClick={() =>
                  this.props.setAddFrndsModalShow(true)
                }
              >
                + Add Friends
              </a>
            </div>
            {this.displayGrpFriends()}
          </div>
        </div>
      </div>
    );
  }
}

export default LeftPanel;

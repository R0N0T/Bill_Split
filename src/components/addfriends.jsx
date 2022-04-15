import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import AddGroup from "../addgroupcontroller";

class AddFriends extends Component {
  addFriend = () => {
    let currentGrpData = this.props.current_data;
    let newFriendName = this.refs.friendName.value;
    let newFriendField = "friend_" + currentGrpData.members_count;
    let newOwesField = "owes_" + currentGrpData.members_count;
    let newFriendDetail = {};
    newFriendDetail["from_expense"] = currentGrpData.expenses.length;
    newFriendDetail[newFriendField] = newFriendName;
    newFriendDetail[newOwesField] = 0;
    currentGrpData.friends_name.push(newFriendDetail);
    currentGrpData.members_count = Number(currentGrpData.members_count) + 1;
    AddGroup.updateGrpFrndData(currentGrpData, () =>
      alert("New Friend Added!")
    );
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
            Add Friends
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <span>
              <label style={{ paddingRight: "10px" }}>
                <i>
                  <b>Name:</b>
                </i>
              </label>
              <input type="text" placeholder="Friend's Name" ref="friendName" />
            </span>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addFriend}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddFriends;

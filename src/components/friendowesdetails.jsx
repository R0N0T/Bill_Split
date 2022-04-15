import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class OwesInEachGrp extends Component {
  render() {
    return (
      <span>
        <h4>
          In
          <i
            style={{
              padding: "10px",
              color: "#5bc5a7",
              fontWeight: "bold"
            }}
          >
            {this.props.in_grp}
          </i>
          -
          <span
            style={{
              color: "#ff652f",
              padding: "10px",
              fontSize: "20px"
            }}
          >
            Owes you Rs.{this.props.owes}
          </span>
        </h4>
      </span>
    );
  }
}

class FriendOwesDetails extends Component {
  displayFrndOwesToGrps = () => {
    let owesInGprs = [];
    if (this.props.owes_to_grps.belongsTo) {
      for (let i = 0; i < this.props.owes_to_grps.belongsTo.length; i++) {
        let group = this.props.group_data.filter(
          grp => grp.group_name === this.props.owes_to_grps.belongsTo[i]
        );
        for (let j = 0; j < group[0].friends_name.length; j++) {
          if (
            this.props.owes_to_grps.name ===
            group[0].friends_name[j]["friend_" + j]
          ) {
            owesInGprs.push(
              <OwesInEachGrp
                key={i + "" + j}
                in_grp={group[0].group_name}
                owes={group[0].friends_name[j]["owes_" + j]}
              />
            );
          }
        }
      }
      return owesInGprs;
    }
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
            {this.props.owes_to_grps.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <center>{this.displayFrndOwesToGrps()}</center>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Delete this friend?</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FriendOwesDetails;

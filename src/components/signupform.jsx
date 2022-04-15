import React, { Component } from "react";
import { Link } from "react-router-dom";
import applogo from "../splitwiselogo-01.png";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    nameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    groups: []
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPhoneChange = e => {
    this.setState({ phone: e.target.value });
  };

  onPassTyped = e => {
    this.setState({ password: e.target.value });
    //console.log(this.state);
  };

  alreadyUser = prevUsers => {
    const currentUser = this.state;
    const userAlready = prevUsers.filter(
      user => user.email === currentUser.email
    );
    //console.log(userAlready);
    return userAlready[0] === undefined ? false : true;
  };

  validateForm() {
    let error = false;
    let emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let phRegEx = /^\d{10}$/;

    this.setState({
      nameError: "",
      emailError: "",
      phoneError: "",
      passwordError: ""
    });

    if (!this.state.name) {
      this.setState({ nameError: "Name cannot be empty" });
      error = true;
    }

    if (!emailRegEx.test(this.state.email)) {
      this.setState({ emailError: "Enter a valid Email address" });
      error = true;
    }

    if (!phRegEx.test(this.state.phone)) {
      this.setState({ phoneError: "Phone number isn't valid" });
      error = true;
    }

    if (this.state.password.length < 5) {
      this.setState({ passwordError: "Password atleast must be of length 5" });
      error = true;
    }

    return error ? true : false;
  }

  submitDetails = e => {
    e.preventDefault();

    if (!this.validateForm()) {
      let currentUsers;
      let getPrevUsers = JSON.parse(localStorage.getItem("signedInUsers"));
      //console.log("getPrevUsers", getPrevUsers);

      if (getPrevUsers !== null) {
        let alreadyUser = this.alreadyUser(getPrevUsers);
        console.log(alreadyUser);
        if (alreadyUser) {
          alert(
            "The user with this credentials is been registered already. Try loggin in..."
          );
        } else {
          currentUsers = this.state;
          console.log("currentUsers", currentUsers);
          let updatedUsers = getPrevUsers.push(currentUsers);
          console.log("updatedUsers", updatedUsers);
          localStorage.setItem("signedInUsers", JSON.stringify(getPrevUsers));
          alert("Successfully Registered");
          this.props.history.push("/login");
        }
      } else {
        currentUsers = [];
        currentUsers.push(this.state);
        localStorage.setItem("signedInUsers", JSON.stringify(currentUsers));
        alert("Successfully Registered");
        this.props.history.push("/login");
      }

      this.setState({
        name: "",
        email: "",
        phone: "",
        password: ""
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <center>
          <img src={applogo} alt="SplitWise Logo" />
        </center>
        <div className="form">
          <div className="container">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  className="form-control"
                  onChange={this.onNameChange}
                  placeholder="Your Name"
                />
              </div>
              <div className="panel">{this.state.nameError}</div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  className="form-control"
                  onChange={this.onEmailChange}
                  placeholder="Your Email"
                />
              </div>
              <div className="panel">{this.state.emailError}</div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={this.state.phone}
                  className="form-control"
                  onChange={this.onPhoneChange}
                  placeholder="Your Number"
                />
              </div>
              <div className="panel">{this.state.phoneError}</div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  className="form-control"
                  onChange={this.onPassTyped}
                  placeholder="Your Password"
                />
              </div>
              <div className="panel">{this.state.passwordError}</div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.submitDetails}
              >
                Sign Up
              </button>
            </form>
            <br />
            <center>
              <Link to="/login">Already have an account?, Log In!</Link>
            </center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUpForm;

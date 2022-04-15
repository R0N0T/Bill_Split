class Auth {
  /*constructor() {
    this.authenticated = false;
  }*/

  login(user, callback) {
    //this.authenticated = true;
    sessionStorage.setItem("LoggedInUser", user);
    callback();
  }

  logout() {
    //this.authenticated = false;
    sessionStorage.removeItem("LoggedInUser");
    sessionStorage.removeItem("current_grp_switch");
    //callback();
  }

  isAuthenticated() {
    let authenticated = sessionStorage.getItem("LoggedInUser");
    return authenticated;
  }
}

export default new Auth();

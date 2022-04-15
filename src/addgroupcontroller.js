class AddGroup {
  initVariables() {
    this.users = JSON.parse(localStorage.getItem("signedInUsers"));
    this.loggedInUser = sessionStorage.getItem("LoggedInUser");
    this.getCurrentUserData = this.users.filter(
      user => user.email === this.loggedInUser
    );
    this.currentUserGrpData = JSON.stringify(this.getCurrentUserData[0].groups);
  }

  getUserName() {
    return sessionStorage.getItem("LoggedInUser");
  }

  createGroup(group, callback) {
    this.initVariables();
    let anyGroup = JSON.parse(this.currentUserGrpData);
    if (anyGroup[0]) {
      //anyGroup = JSON.parse(anyGroup);
      anyGroup.push(group);
    } else {
      anyGroup = [];
      anyGroup.push(group);
    }
    //localStorage.setItem("Groups", JSON.stringify(anyGroup));
    //console.log(this.users);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === this.loggedInUser) {
        this.users[i].groups = anyGroup;
        break;
      }
    }

    localStorage.setItem("signedInUsers", JSON.stringify(this.users));
    sessionStorage.setItem("current_grp_switch", group.group_name);
    callback();
  }

  getGroups() {
    //return localStorage.getItem("Groups");
    //this.users = JSON.parse(localStorage.getItem("signedInUsers"));
    //this.loggedInUser = sessionStorage.getItem("LoggedInUser");
    /*this.getCurrentUserData = this.users.filter(
      user => user.email === this.loggedInUser
    );*/
    //this.currentUserGrpData = JSON.stringify(this.getCurrentUserData[0].groups);
    //console.log(this.currentUserGrpData);
    this.initVariables();
    return this.currentUserGrpData;
  }

  setAddExpense(updated_data, callback) {
    let currentData = JSON.parse(this.getGroups());

    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].group_name === updated_data.group_name) {
        currentData[i].friends_name = updated_data.friends_name;
        currentData[i].owed = updated_data.owed;
        currentData[i].expenses = updated_data.expenses;
        //localStorage.setItem("Groups", JSON.stringify(currentData));
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].email === this.loggedInUser) {
            this.users[i].groups = currentData;
            break;
          }
        }
        localStorage.setItem("signedInUsers", JSON.stringify(this.users));
      }
    }
    callback();
  }

  getCurrentGrpSwitch() {
    this.initVariables();
    let groupsData = JSON.parse(this.currentUserGrpData);
    if (groupsData[0] === undefined) {
      return false;
    }
    let currentGrpName = sessionStorage.getItem("current_grp_switch");
    if (currentGrpName) {
      let grp = groupsData.filter(g => g.group_name === currentGrpName);
      return grp[0];
    }
    return groupsData[0];
  }

  setCurrentGrpSwitch(group_name) {
    sessionStorage.setItem("current_grp_switch", group_name);
  }

  deleteGrpExpense(
    totalOwed,
    grpFriends,
    currentExpense,
    grpExpense,
    id,
    callback
  ) {
    this.initVariables();
    let grps = JSON.parse(this.currentUserGrpData);
    let uptExpLen = 0;

    for (let i = 0; i < grps.length; i++) {
      if (grps[i].group_name === grpExpense.group_name) {
        grps[i].owed = totalOwed;
        grps[i].friends_name = grpFriends;
        let updatedExpenses = grpExpense.expenses.filter(
          (expense, index) =>
            expense["expense_" + index] !== currentExpense["expense_" + id]
        );

        uptExpLen = updatedExpenses.length;
        let refineUpdatedExpense = [];
        let idxI = 0;
        let idxJ = 0;
        let exp = {};
        while (idxI < uptExpLen) {
          if (updatedExpenses[idxI]["expense_" + idxJ] !== undefined) {
            exp["id"] = updatedExpenses[idxI]["id"];
            exp["members_count"] = updatedExpenses[idxI]["members_count"];
            exp["expense_" + idxI] = updatedExpenses[idxI]["expense_" + idxJ];
            exp["youPaid_" + idxI] = updatedExpenses[idxI]["youPaid_" + idxJ];
            exp["youLent_" + idxI] = updatedExpenses[idxI]["youLent_" + idxJ];
            exp["onMonth"] = updatedExpenses[idxI]["onMonth"];
            exp["onDate"] = updatedExpenses[idxI]["onDate"];
            idxI++;
            refineUpdatedExpense.push(exp);
            exp = {};
          }
          idxJ++;
        }

        grps[i].expenses = refineUpdatedExpense;
        break;
      }
    }
    //localStorage.setItem("Groups", JSON.stringify(grps));
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === this.loggedInUser) {
        this.users[i].groups = grps;
        break;
      }
    }

    localStorage.setItem("signedInUsers", JSON.stringify(this.users));

    callback();
  }

  updateGrpFrndData(currentGrpData, callback) {
    this.initVariables();

    let currentUserGrpDataParsed = JSON.parse(this.currentUserGrpData);

    for (let i = 0; i < currentUserGrpDataParsed.length; i++) {
      if (
        currentGrpData.group_name === currentUserGrpDataParsed[i].group_name
      ) {
        currentUserGrpDataParsed[i].members_count =
          currentGrpData.members_count;
        currentUserGrpDataParsed[i].friends_name = currentGrpData.friends_name;
        break;
      }
    }

    this.getCurrentUserData[0].groups = currentUserGrpDataParsed;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === this.loggedInUser) {
        this.users[i] = this.getCurrentUserData[0];
        localStorage.setItem("signedInUsers", JSON.stringify(this.users));
        break;
      }
    }
    callback();
  }
}

export default new AddGroup();

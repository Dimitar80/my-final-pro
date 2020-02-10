import React from "react";
import axios from "axios";
import "../../assets/styles/DeleteUser.css";
import "../../assets/styles/shared.css";
import { Redirect } from "react-router-dom";

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,

      redirect: false
    };
  }

  render() {
    // console.log(this.props);

    // const id = this.props.userId;
    // console.log(id);
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/register" />;
    }

    const userFullName = this.props.fullName;
    console.log(userFullName);

    return (
      <div id="delproducts">
        <div id="back-screen">
          <div id="delbox">
            <div id="boxtext">
              <h2>Delete User</h2>
              <p>
                You are about to delete this User Account with all files created
                by this user -{" "}
                <span style={{ fontWeight: "900", fontSize: "18px" }}>
                  {userFullName}
                </span>
                <br />
                Are you sure you want to continue?
              </p>
            </div>
            <div id="delBox-buttons">
              <button id="cancel" onClick={this.props.clDelUser}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteUser;

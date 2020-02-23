import React from "react";
import axios from "axios";
import "../../assets/styles/DeleteUser.css";
import "../../assets/styles/shared.css";
import { Redirect } from "react-router-dom";

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: this.props.ajdi
      toggle: true,
      rowIdToDelete: null,
      redirect: false
    };
  }

  delDocsAndUser = () => {
    const id = this.props.userId;
    const userot = this.props.fullName;
    console.log(userot);
    axios
      .delete("/api/v1/products/user/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      })
      .then(res => {
        // alert("This User files are successfully deleted from data base");
        // this.setState({ redirect: true });
        console.log("Deleted: ", res);
        // this.props.fgetProducts(); // Povik do baza-nov call!!!???
        console.log(res.data);
        axios
          .delete("/api/v1/auth/" + id, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
          })
          .then(res => {
            alert(`User Account for ${userot} is successfully deleted`);
            // localStorage.clear();
            this.setState({ redirect: true });
            // this.props.history.push('/products') ???//
          })
          .catch(err => {
            console.log(err + "Greska za Del User!");
          });
      })
      .catch(error => {
        console.log(error + " Greska za Del User files!");
      });
  };

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
      <div id="du-back-screen">
        <div id="user-delbox">
          <div id="user-boxtext">
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
              CANCEL
            </button>
            <button
              id="delete"
              /*onClick={() => this.props.delRow(id)}*/ onClick={
                this.delDocsAndUser
              }
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteUser;

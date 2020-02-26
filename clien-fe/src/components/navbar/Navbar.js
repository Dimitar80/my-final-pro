import React from "react";
import "../../assets/styles/Navbar.css";
import "../../assets/styles/shared.css";
import { Link, Redirect } from "react-router-dom";
import SignOut from "./SignOut";
import UserImg from "../../assets/img/DPPHOTO.jpg";

// Navbar 'sreden'
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.toggle,
      signOut: false,
      uff: this.props.tes,
      // show: false
      redirect: false,
      delShow: false
    };
  }
  //TESTS//
  showProducts = () => {
    this.setState({
      toggle: false
    });
  };

  showExpenses = () => {
    this.setState({
      toggle: true
    });
  };

  signOut = () => {
    this.setState({ signOut: !this.state.signOut });
  };

  closeBt = () => {
    console.log("Function called");
    this.setState({ signOut: false });
  };

  render() {
    return (
      <React.Fragment>
        {!localStorage.getItem("jwt") ? <Redirect to="/" /> : null}
        {/* <header id='header'> */}
        <div id="header">
          <nav id="mainnav">
            <Link to="/products">
              <button
                onClick={this.showProducts}
                className={
                  !this.state.toggle ? "navbar-button active" : "navbar-button"
                }
              >
                PRODUCTS
              </button>
            </Link>
            <Link to="/expenses">
              <button
                onClick={this.showExpenses}
                className={
                  this.state.toggle ? "navbar-button active" : "navbar-button"
                }
              >
                EXPENSES
              </button>
            </Link>
          </nav>

          <div id="user" className="dropdown">
            <img id="pic" src={UserImg} alt="profileimg" />
            <h3
              id="touch"
              className={
                this.state.signOut ? "user-cl active-user-cl" : "user-cl"
              }
              onClick={this.signOut}
            >
              {localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")}
            </h3>
            <div className="dropdown-content">
              {this.state.signOut ? (
                <SignOut
                  // ajdi={this.state.rowIdToDelete}}
                  clBtn={this.closeBt}
                  sO={this.signOut}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* </header> */}
      </React.Fragment>
    );
  }
}

export default Navbar;

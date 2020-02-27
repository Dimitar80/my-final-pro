import React from "react";
import "../../assets/styles/ProLogin.css";
import "../../assets/styles/shared.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class ProLogin extends React.Component {
  constructor(/*props*/) {
    super(/*props*/);
    this.state = {
      // email: null,
      email: "",
      //   password: null,
      password: "",
      hidden: true,
      redirect: false,
      error: null,
      datite: null,
      exsUserData: null,
      userlist: [],
      extUserEmails: []
    };
  }

  usersList = () => {
    axios
      .get("/api/v1/auth/userslist")
      .then(res => {
        this.setState({ userlist: res.data /*loading: false*/ }, () => {
          console.log(this.state.userlist);
        });
      })
      .catch(err => {
        // this.setState({ loading: false });
        console.log(err);
      });
  };

  // usersList();
  componentDidMount() {
    console.log("Table data did mount");
    this.usersList();
  }

  saveInputValue = event => {
    this.setState({ [event.target.id]: event.target.value });
    // console.log(event.target.id);
    // console.log(event.target.value);
  };

  logIn = (/*event*/) => {
    // event.preventDefault();
    // for (let e = 0; e < this.state.userlist.length; e++) {
    //   if (this.state.userlist[e].email !== this.state.email) {
    //     // console.log("Existing user email - " + this.state.userlist[e].email);
    //     // console.log("Entered email - " + this.state.email);
    //     this.setState({
    //       error: "Your e-mail is incorrect. Try again !",
    //       exsUserData: null
    //     });
    //   }
    //   // if (this.state.userlist[e].password === this.state.password) {
    //   //   console.log(this.state.userlist[e].password);
    //   //   console.log(this.state.password);
    //   // } else {
    //   //   console.log("Wrong Password!, try again");
    //   // }
    // }
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.email === null ||
      this.state.password === null
    ) {
      this.setState({
        exsUserData: "Both fields must be filled out to Sign In!",
        error: null
      });
      // event.preventDefault();
      console.log(this.state.exsUserData);
    } else if (
      this.state.email !== "" &&
      // this.state.userlist[e].email !== this.state.email &&
      this.state.password !== ""
      // this.state.email != null
      // this.state.password != null
    ) {
      axios
        .post("/api/v1/auth/login", {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("firstName", res.data.first_name);
          localStorage.setItem("lastName", res.data.last_name);
          localStorage.setItem("_id", res.data.id);
          this.setState({ redirect: true });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: "Your e-mail/password is incorrect. Try again !",
            exsUserData: null
          });
          // console.log(this.state.error);
        });
    }
  };

  toggleShow = e => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/products" />;
    }

    return (
      <React.Fragment>
        <div id="prologin">
          <div className="box-container">
            <div>
              {/* <div style={{ maxWidth: "400px", margin: "auto" }}> */}
              <div className="input-icons">
                <p className="input-container">
                  <label className="text-label">E-mail</label>
                  <input
                    type="text"
                    className="text-input"
                    //   placeholder="Korekcii - Finishing"
                    id="email"
                    onChange={this.saveInputValue}
                  />
                </p>
                <p className="input-container">
                  <label className="text-label">Password</label>
                  <input
                    type={this.state.hidden ? "password" : "text"}
                    className="text-input"
                    id="password"
                    onChange={this.saveInputValue}
                    // value={this.state.password}
                  />
                  <i
                    className={
                      this.state.hidden
                        ? "fas fa-eye-slash icon"
                        : "fas fa-eye icon"
                    }
                    style={{ color: "#c6c6c6" }}
                    onClick={this.toggleShow}
                  />
                </p>
                <p id="alert-msg">
                  {this.state.exsUserData}
                  {this.state.error}
                </p>
              </div>
              {/* </div> */}
              <button className="signin-button" onClick={this.logIn}>
                SIGN IN
              </button>
            </div>
          </div>
          <div className="additional-info">
            <p>
              {" "}
              Or if you don't have an account,
              <Link
                to="/register"
                activestyle={{ color: "red" }}
                style={{
                  textDecoration: "none",
                  color: "#8d8d8d",
                  fontWeight: 700
                }}
              >
                &nbsp; Register.
              </Link>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProLogin;

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
      exsUserData: null
    };
  }

  saveInputValue = event => {
    this.setState({ [event.target.id]: event.target.value });
    // console.log(event.target.id);
    // console.log(event.target.value);
  };

  logIn = event => {
    event.preventDefault();

    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.email === null ||
      this.state.password === null
    ) {
      // this.setState({ email: null, password: "" });//
      this.setState({
        exsUserData: "Both fields must be filled out to Sign In!",
        error: null
      });
      event.preventDefault();
      console.log(this.state.exsUserData);
      // alert("All fields must be filled out to SignIn!");
    }
    if (
      this.state.email !== "" &&
      this.state.password !== ""
      // this.state.email != null
      // this.state.password != null
    ) {
      axios
        .post("http://127.0.0.1:8081/api/v1/auth/login", {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          // this.setState({ datite: res.data });
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("firstName", res.data.first_name);
          localStorage.setItem("lastName", res.data.last_name);
          localStorage.setItem("_id", res.data.id);
          this.setState({ redirect: true });
        })
        .catch(err => {
          console.log(
            err
            // alert("Your e-mail or password is incorrect. Try again")
          );
          this.setState({
            error:
              // <i className="fa fa-exclamation-circle" aria-hidden="true">
              "Your e-mail/password is incorrect. Try again !",
            //  </i>
            exsUserData: null
          });
          console.log(this.state.error);
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
    // console.log(this.logIn(err.data));
    // console.log(this.state.exsUserData);
    // console.log(this.state.error);
    // console.log(this.state.datite);
    // console.log(this.v);

    return (
      <React.Fragment>
        <div id="prologin">
          <div className="box-container">
            <form>
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
            </form>
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

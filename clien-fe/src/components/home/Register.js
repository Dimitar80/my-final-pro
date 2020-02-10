import React from "react";
import "../../assets/styles/Register.css";
import "../../assets/styles/shared.css";
// import { BrowserRouter as Link } from 'react-router-dom'
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  constructor(/*props*/) {
    super(/*props*/);
    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      password: "",
      // password: null,
      hidden: true,
      date_of_birth: null,
      telephone: null,
      country: null,
      redirect: false
    };
  }

  saveUserData = event => {
    this.setState({ [event.target.id]: event.target.value });
    // console.log("event.target.id", event.target.id);
    // console.log("event.target.value", event.target.value);
  };
  // Proverka za Register za Mailot(@...) i za passwordot... i davanje poraka za ako nesto missing!!!?)
  createUser = event => {
    if (
      this.state.first_name === null ||
      this.state.last_name === null ||
      this.state.email === null ||
      this.state.password === null ||
      this.state.date_of_birth === null ||
      this.state.telephone === null ||
      this.state.country === null
    ) {
      event.preventDefault();
      alert(
        "All fields must be filled out for Registration form to be created successfully!"
      );
    } else if (
      this.state.first_name != null &&
      this.state.last_name != null &&
      this.state.email != null &&
      this.state.password != null &&
      this.state.date_of_birth != null &&
      this.state.telephone != null &&
      this.state.country != null
    ) {
      event.preventDefault();
      axios
        .post("http://127.0.0.1:8081/api/v1/auth/register", {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
          date_of_birth: this.state.date_of_birth,
          telephone: this.state.telephone,
          country: this.state.country,
          _created: new Date()
        })
        .then(res => {
          console.log(res.data);
          axios
            .post("http://127.0.0.1:8081/api/v1/auth/login", {
              email: this.state.email,
              password: this.state.password
            })
            .then(res => {
              localStorage.setItem("jwt", res.data.jwt);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("firstName", res.data.first_name);
              localStorage.setItem("lastName", res.data.last_name);
              this.setState({ redirect: true });
              alert("Registration form is successfully created");
              // this.props.history.push('/products') ???//
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
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
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <div id="register">
          <div className="box-container" id="regbox">
            <form>
              <div className="reg-input-icons">
                <p className="input-container">
                  <label className="text-label">First Name</label>
                  <input
                    className="text-input"
                    type="text"
                    id="first_name"
                    onChange={this.saveUserData}
                  />
                </p>
                <p className="input-container">
                  <label className="text-label">Last Name</label>
                  <input
                    className="text-input"
                    type="text"
                    id="last_name"
                    onChange={this.saveUserData}
                  />
                </p>
                <p className="input-container">
                  <label className="text-label">E-mail</label>
                  <input
                    className="text-input"
                    type="email"
                    id="email"
                    onChange={this.saveUserData}
                  />
                </p>
                <p className="input-container">
                  <label className="text-label">Password</label>
                  <input
                    className="text-input"
                    // type="password"
                    type={this.state.hidden ? "password" : "text"}
                    id="password"
                    onChange={this.saveUserData}
                  />
                  <i
                    id="reg"
                    className={
                      this.state.hidden
                        ? "fas fa-eye-slash reg-icon"
                        : "fas fa-eye reg-icon"
                    }
                    style={{ color: "#c6c6c6" }}
                    onClick={this.toggleShow}
                  />
                </p>
                <p className="input-container">
                  <label className="text-label">Date of Birth</label>
                  <input
                    className="text-input"
                    type="date"
                    max="2999-12-31"
                    id="date_of_birth"
                    onChange={this.saveUserData}
                  />
                </p>
                <p className="input-container">
                  <label className="text-label">Telephone</label>
                  <input
                    className="text-input"
                    type="text"
                    id="telephone"
                    onChange={this.saveUserData}
                  />
                </p>
                <p className="input-container">
                  <label className="text-label">Country</label>
                  <input
                    className="text-input"
                    type="text"
                    id="country"
                    onChange={this.saveUserData}
                  />
                </p>
              </div>
              <button
                className="primary-button"
                type="submit"
                onClick={this.createUser}
              >
                REGISTER
              </button>
            </form>
          </div>
          <div className="additional-info">
            <p>
              Or if you already have an account,
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#8d8d8d",
                  fontWeight: 700
                }}
              >
                &nbsp; Sign in.
              </Link>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;

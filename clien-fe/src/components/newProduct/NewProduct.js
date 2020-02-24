import React from "react";
import "../../assets/styles/NewProduct.css";
import "../../assets/styles/shared.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: null,
      productType: null,
      productDescription: null,
      purchaseDate: null,
      productPrice: null,
      redirect: false
      // udata: [],
      // upd: null
    };
  }

  saveInputValue = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  createProduct = () => {
    // console.log('clicked')
    if (
      this.state.productName === null ||
      this.state.productType === null ||
      this.state.productDescription === null ||
      this.state.purchaseDate === null ||
      this.state.productPrice === null
    ) {
      alert(
        "All fields must be filled out for New Product to be created successfully!"
      );
    } else {
      axios
        .post(
          "http://127.0.0.1:8082/api/v1/products/",
          {
            productName: this.state.productName,
            productType: this.state.productType,
            productDescription: this.state.productDescription,
            purchaseDate: this.state.purchaseDate,
            productPrice: this.state.productPrice,
            _created: new Date()
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
          }
        )
        .then(res => {
          // console.log(res);
          console.log("NEW PRODUCT IS CREATED");
          this.setState({ redirect: true });
          alert("New Product is created successfully");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    // console.log(this.props)
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/products" />;
    }

    const NavbarSur = this.props.component;
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <NavbarSur toggle={false} />
        <div id="newproducts">
          {/* Portal */}
          <div id="npmain-container">
            <div id="npmaintitle">
              <h1>New Product</h1>
            </div>
            <div className="np-form-container">
              <div id="np-fpage">
                <form>
                  <p className="input-container">
                    <label className="nplabel">Product Name</label>
                    <input
                      type="text"
                      className="nptextfield"
                      id="productName"
                      onChange={this.saveInputValue}
                    />
                  </p>
                  <p className="input-container">
                    <label className="nplabel">Product Type</label>
                    <input
                      type="text"
                      className="nptextfield"
                      id="productType"
                      onChange={this.saveInputValue}
                    />
                  </p>
                  <p className="input-container">
                    <label className="nplabel">Product Description</label>
                    <input
                      type="text"
                      className="nptextfield"
                      id="productDescription"
                      onChange={this.saveInputValue}
                    />
                  </p>
                  <p className="input-container">
                    <label className="nplabel">Purchase Date</label>
                    <input
                      type="date"
                      max="2999-12-31"
                      className="nptextfield"
                      id="purchaseDate"
                      onChange={this.saveInputValue}
                    />
                  </p>
                  <p className="input-container">
                    <label className="nplabel">Product Price</label>
                    <input
                      type="text"
                      className="nptextfield"
                      id="productPrice"
                      onChange={this.saveInputValue}
                    />
                  </p>
                  <div id="btnsNp">
                    <div id="createP">
                      <button
                        type="button"
                        className="cp-button"
                        onClick={this.createProduct}
                      >
                        CREATE PRODUCT
                      </button>
                    </div>
                    <div id="closeNp">
                      <Link
                        to="products"
                        style={{ width: "0px", height: "0px" }}
                      >
                        <button className="cl-button">CLOSE</button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div id="np-right-page">
                <p id="simbol">
                  <i className="fas fa-plus-circle" />
                </p>
                <p id="title">You are creating a new product</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewProduct;

import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "../../assets/styles/EditProduct.css";
import "../../assets/styles/shared.css";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edata: [],
      productName: null,
      productType: null,
      productDescription: null,
      purchaseDate: null,
      productPrice: null,
      redirect: false,
      loading: false
    };
  }

  GetProductById = () => {
    this.setState({ loading: true });
    axios
      .get(
        "http://127.0.0.1:8082/api/v1/products/" + this.props.match.params.id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        }
      )
      .then(res => {
        const ep = res.data;
        console.log(ep);
        // setTimeout(() => this.setState({ edata: ep, loading: false }), 1000);
        this.setState({ edata: ep, loading: false }, () => {
          console.log("Product data - " + this.state.edata[0]);
          console.log("Existing generated _id - " + this.state.edata[0]._id);
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error + " Greska");
      });
  };

  componentDidMount() {
    this.GetProductById();
  }

  saveInputValue = event => {
    this.setState({ [event.target.id]: event.target.value });
    console.log(event.target.id);
    console.log(event.target.value);
  };

  // put/patch
  editProduct = event => {
    if (
      this.state.productName === "" ||
      this.state.productType === "" ||
      this.state.productDescription === "" ||
      this.state.purchaseDate === "" ||
      this.state.productPrice === 0
    ) {
      alert("All fields must be filled out for successfully Edit-ed Product!");
      event.preventDefault();
    } else {
      axios
        .put(
          "http://127.0.0.1:8082/api/v1/products/" + this.props.match.params.id,
          {
            productName:
              this.state.productName || this.state.edata[0].productName,
            productType:
              this.state.productType || this.state.edata[0].productType,
            productDescription:
              this.state.productDescription ||
              this.state.edata[0].productDescription,
            purchaseDate:
              this.state.purchaseDate || this.state.edata[0].purchaseDate,
            productPrice:
              this.state.productPrice || this.state.edata[0].productPrice,
            _modified: new Date()
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
          }
        )
        .then(res => {
          console.log(res);
          this.setState({ redirect: true });
          alert("This Product is Edited successfully");
        })
        .catch(err => {
          console.log(err);
          alert(
            "All fields must be filled out to edit your product succesfuly!"
          );
        });
    }
  };

  render() {
    // console.log(this.props);
    // console.log(this.state.edata);
    // console.log(this.props.match.params.id);

    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/products" />;
    }
    const NavbarSur = this.props.component;
    return (
      <React.Fragment>
        <NavbarSur toggle={false} />
        <div id="editproducts">
          <div id="epmain-container">
            <div id="epmaintitle">
              <h1>Edit Product</h1>
            </div>
            <div className="epform-container">
              <div id="epfpage">
                {this.state.edata.length > 0 ? (
                  <form>
                    <p className="input-container">
                      <label className="eplabel">Product Name</label>
                      <input
                        type="text"
                        className="eptextfield"
                        id="productName"
                        onChange={this.saveInputValue}
                        defaultValue={this.state.edata[0].productName}
                      />
                    </p>
                    <p className="input-container">
                      <label className="eplabel">Product Type</label>
                      <input
                        type="text"
                        className="eptextfield"
                        id="productType"
                        onChange={this.saveInputValue}
                        defaultValue={this.state.edata[0].productType}
                      />
                    </p>
                    <p className="input-container">
                      <label className="eplabel">Product Description</label>
                      <input
                        type="text"
                        className="eptextfield"
                        id="productDescription"
                        onChange={this.saveInputValue}
                        defaultValue={this.state.edata[0].productDescription}
                      />
                    </p>
                    <p className="input-container">
                      <label className="eplabel">Purchase Date</label>
                      <input
                        type="date"
                        max="2999-12-31"
                        className="eptextfield"
                        id="purchaseDate"
                        onChange={this.saveInputValue}
                        defaultValue={this.state.edata[0].purchaseDate.slice(
                          0,
                          10
                        )}
                      />
                    </p>
                    <p className="input-container">
                      <label className="eplabel">Product Price</label>
                      <input
                        type="text"
                        className="eptextfield"
                        id="productPrice"
                        onChange={this.saveInputValue}
                        defaultValue={this.state.edata[0].productPrice}
                      />
                    </p>
                    <div id="btnsEp">
                      <div /*className="eps-button"*/>
                        <button
                          type="button"
                          className="eps-button"
                          onClick={this.editProduct}
                        >
                          SAVE
                        </button>
                      </div>
                      <div>
                        <Link
                          to="/products"
                          style={{ width: "0px", height: "0px" }}
                        >
                          <button className="epcl-button">CLOSE</button>
                        </Link>
                      </div>
                    </div>
                  </form>
                ) : (
                  <h2>Loading...</h2>
                )}
              </div>
              <div id="ep-right-page">
                <p id="ep-simbol">
                  <i className="fas fa-plus-circle" />
                </p>
                <p id="ep-title">You are editing an existing product</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default EditProduct;

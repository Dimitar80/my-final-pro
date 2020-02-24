import React from "react";
import axios from "axios";
import "../../assets/styles/ProductsNew.css";
import "../../assets/styles/shared.css";
import { Link } from "react-router-dom";
import TableAll from "../table/TableAll";

class ProductsNew extends React.Component {
  constructor() {
    super();
    this.state = {
      showEditDeleteBtns: true,
      data: [],
      sort: "",
      didUpd: false,
      loading: false,
      povik: null,
      id: false,
      pD: false,
      pP: false
    };
  }

  getProducts = () => {
    this.setState({ loading: true });
    axios
      .get(`http://127.0.0.1:8082/api/v1/products/?sort=purchaseDate:desc`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      })
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("Table data did mount");
    this.getProducts();
  }

  getSortedProducts = () => {
    this.setState({ loading: true });
    axios
      .get(`http://127.0.0.1:8082/api/v1/products/?sort=${this.state.sort}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      })
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err, "ERROR at Products component");
      });
  };

  SortProductsBy = event => {
    let that = this;
    this.setState(
      {
        sort: event.target.value
      },
      () => {
        // console.log("SortProductsBy CB");
        if (
          this.state.sort === "purchaseDate:asc" ||
          this.state.sort === "purchaseDate:desc"
        ) {
          this.setState(
            {
              pD: true,
              pP: false
            },
            () => {
              // console.log(this.state.pD);
            }
          );
        } else if (
          this.state.sort === "productPrice:asc" ||
          this.state.sort === "productPrice:desc"
        ) {
          this.setState({
            pP: true,
            pD: false
          });
        }
        // console.log(this.state.sort);
        that.getSortedProducts();
      }
    );
  };

  render() {
    console.log("Component in render");
    const NavbarSur = this.props.component;

    return (
      <React.Fragment>
        <NavbarSur toggle={false} />
        <div id="products">
          {/* PORTAL */}
          <div className="prmain-container">
            <div id="pmaintitle">
              <div className="tit">
                <h1>Products</h1>
              </div>
              <div id="filter">
                <h2>Sort by:</h2>
                <select onChange={this.SortProductsBy}>
                  <option id="Lp" value="purchaseDate:desc">
                    Latest Purchase
                  </option>
                  <option id="Fp" value="purchaseDate:asc">
                    First Purchase
                  </option>
                  <option id="Hp" value="productPrice:desc">
                    Highest Price
                  </option>
                  <option id="Lp" value="productPrice:asc">
                    Lowest Price
                  </option>
                </select>
              </div>
            </div>
            <div id="mainonebtn">
              <Link
                to="/newproduct"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <button id="btnnewproduct">NEW PRODUCT</button>
              </Link>
            </div>
            <TableAll
              dataLoading={this.state.loading}
              data={this.state.data}
              showEdDel={this.state.showEditDeleteBtns}
              fgetProducts={this.getProducts}
              pd={this.state.pD}
              pp={this.state.pP}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductsNew;

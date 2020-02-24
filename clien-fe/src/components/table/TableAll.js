import React from "react";
import axios from "axios";
import "../../assets/styles/shared.css";
import "../../assets/styles/Table.css";
// import { Redirect } from "react-router-dom";
import DeleteRow from "../calculator/DeleteRow";
import TableBody from "./TableBody";

class TableAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // show: false,
      udata: [],
      // showEditDelete: true,
      // loading: false,
      rowIdToDelete: null,
      xmm: this.props.sortS
      // show: true
    };
  }

  delBoxOpen = id => {
    this.setState({
      show: !this.state.show,
      rowIdToDelete: id
    });
    // console.log("ID: ", id);
  };
  closeBt = () => {
    console.log("Function called");
    this.setState({ show: false });
  };

  deleteRow = id => {
    axios
      .delete("http://127.0.0.1:8081/api/v1/products/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      })
      .then(res => {
        this.setState({ show: false });
        console.log("Deleted: ", res);
        this.props.fgetProducts(); // Povik do baza-nov call!!!???
      })
      .catch(error => {
        console.log(error + " Greska");
      });
  };

  render() {
    // console.log(this.props);

    return (
      // this.state.udata.length > 0 ?
      <React.Fragment>
        {/* <div className="products-table-container"> */}
        <table
          /*id="emaintable"*/ className={
            this.props.showEdDel ? "pmaintable" : "emaintable"
          }
        >
          <thead className="products-table-head">
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th className={this.props.pd ? "gr" : "def"}>Purchase Date</th>
              <th className={this.props.pp ? "gr" : "def"}>Product Price</th>
              {this.props.showEdDel ? <th>Edit / Delete</th> : <th></th>}
            </tr>
          </thead>
          <tbody className="products-table-body">
            <TableBody {...this.props} delBtnOpen={this.delBoxOpen} />
          </tbody>
        </table>
        {this.state.show && (
          <DeleteRow
            ajdi={this.state.rowIdToDelete}
            clBtn={this.closeBt}
            delRow={this.deleteRow}
            proba={this.props.data}
          />
        )}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default TableAll;

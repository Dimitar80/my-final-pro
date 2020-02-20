import React from "react";
import "../../assets/styles/DeleteRow.css";
import "../../assets/styles/shared.css";

class DeleteRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: this.props.ajdi
      toggle: true,
      rowIdToDelete: null
    };
  }

  render() {
    // console.log(this.props);
    // console.log(this.state.data)
    const id = this.props.ajdi;
    // console.log(this.props.proba[0].productName, "TESTIS");
    const names = this.props.proba;
    // console.log(names);
    let pN = null;
    for (let i = 0; i < names.length; i++) {
      if (names[i]._id === id) {
        pN = names[i].productName;
      }
    }
    console.log(pN);

    return (
      <div id="back-screen">
        <div id="delbox">
          <div id="boxtext">
            <h2>Delete Product</h2>
            <p>
              You are about to delete this product -{" "}
              <span style={{ fontWeight: "900", fontSize: "18px" }}>{pN}</span>
              <br />
              Are you sure you want to continue?
            </p>
          </div>
          <div id="delBox-buttons">
            <button id="cancel" onClick={this.props.clBtn}>
              CANCEL
            </button>
            <button id="delete" onClick={() => this.props.delRow(id)}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteRow;

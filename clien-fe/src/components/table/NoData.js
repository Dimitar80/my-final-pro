import React from "react";

const NoDataFound = props => {
  return (
    <React.Fragment>
      <tr>
        <td colSpan="6" style={{ border: "2px solid red" }}>
          <span
            style={{
              textAlign: "center",
              color: "#09488b"
            }}
          >
            <h2>{props.message}</h2>
          </span>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default NoDataFound;

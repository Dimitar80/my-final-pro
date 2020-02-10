import React from "react";
import ProductRow from "./ProductRow";
import NoDataFound from "./NoData";

const TableBody = props => {
  // console.log("Table Body loading", props.dataLoading);

  // console.log(props.mesec);
  // console.log(props.godina);

  // console.log(props.data.purchaseDate.slice(0, 4));
  let myW = null;
  let onlyM = null;
  for (let i = 0; i < props.data.length; i++) {
    // console.log(props.data[i].purchaseDate);
    myW = props.data[i].purchaseDate.slice(5, 7);
    onlyM = Number(myW);
    // console.log(myW);
    // console.log(onlyM);
  }

  if (props.dataLoading) {
    return <NoDataFound message={"Loading..."} />;
  }
  if (props.data.length !== 0) {
    return props.data.map(product => {
      return (
        <ProductRow
          key={product._id}
          productId={product._id}
          productName={product.productName}
          productType={product.productType}
          productDescription={product.productDescription}
          purchaseDate={product.purchaseDate.slice(0, 10)}
          productPrice={product.productPrice}
          EdDel={props.showEdDel}
          del={props.delBtnOpen}
          ppR={props.pp}
          pdR={props.pd}
        />
      );
    });
  }
  if (props.mesec !== onlyM) {
    return (
      <NoDataFound
        message={
          "No data was found for this request - Year/Month, Please choose another one!"
        }
      />
    );
  }
  if (props.godina === "Years" /*props.data.length === 0*/) {
    return (
      <NoDataFound
        message={"No data was found for this User, Please create NEW PRODUCT!"}
      />
    );
  }
};

export default TableBody;

// const TableBody = props => {
//   // console.log("Table Body loading", props.dataLoading);
//   // console.log(props);

//   if (props.dataLoading) {
//     return <NoDataFound message={"Loading..."} />;
//   }
//   if (props.data.length !== 0) {
//     console.log(props.data[0].purchaseDate.slice(0, 4));
//     return props.data.map(product => {
//       return (
//         <ProductRow
//           key={product._id}
//           productId={product._id}
//           productName={product.productName}
//           productType={product.productType}
//           productDescription={product.productDescription}
//           purchaseDate={product.purchaseDate.slice(0, 10)}
//           productPrice={product.productPrice}
//           EdDel={props.showEdDel}
//           del={props.delBtnOpen}
//           ppR={props.pp}
//           pdR={props.pd}
//         />
//       );
//     });
//   } else {
//     return (
//       <NoDataFound
//         message={
//           "No data was found for this request - Year/Month, Please choose another one!"
//         }
//       />
//     );
//   }
// };

// export default TableBody;

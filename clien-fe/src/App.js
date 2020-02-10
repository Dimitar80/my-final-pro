// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
/* FINAL PROJECT - EC finishing*/
import React from "react";
// import ReactDOM from "react-dom";

// import { Provider } from 'react-redux'
// import store from './redux/store.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import ProLogin from "./components/home/ProLogin";
import Register from "./components/home/Register";
import UpdateUser from "./components/navbar/UpdateUser";
import Expenses from "./components/calculator/Expenses";
import ProductsNew from "./components/calculator/ProductsNew";
import NewProduct from "./components/newProduct/NewProduct";
import EditProduct from "./components/table/EditProduct";

// HTML
// const app = document.getElementById("app");
// console.log('DP')

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ProLogin} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/expenses"
          render={() => <Expenses component={Navbar} />}
        />
        <Route
          exact
          path="/products"
          render={() => <ProductsNew component={Navbar} />}
        />
        <Route
          exact
          path="/newproduct"
          render={() => <NewProduct component={Navbar} />}
        />
        <Route
          exact
          path="/editproduct/:id"
          render={props => <EditProduct {...props} component={Navbar} />}
        />
        <Route
          exact
          path="/edituser/:id"
          render={props => <UpdateUser {...props} component={Navbar} />}
        />
      </Switch>
    </Router>
  );
};

export default App;

// ReactDOM.render(<Routes />, app);

// ReactDOM.render(
//     <Provider store={store}>
//         <Routes/>
//     </Provider>, app)

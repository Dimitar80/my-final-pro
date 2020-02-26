import React from "react";
import axios from "axios";
import "../../assets/styles/Expenses.css";
import "../../assets/styles/shared.css";
import TableAll from "../table/TableAll";
// import ReactTooltip from "react-tooltip";

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      data: [],
      unidata: [],
      yearValue: "Years",
      monthValue: "Months",
      loading: false,
      value: ""
    };
  }

  getAllProductsInExp = () => {
    this.setState({ loading: true });
    // const url = this.formatUrl();
    axios
      .get(`/api/v1/products/?sort=purchaseDate:desc`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      })
      .then(res => {
        this.setState(
          {
            unidata: res.data,
            data: res.data,
            loading: false
          }
          // () => {
          //   console.log(this.state.data);
          // }
        );
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    // console.log("Expenses did mount");
    this.getAllProductsInExp();
  }

  showYearlyBtn = e => {
    this.getAllProductsInExp();
    this.setState({
      toggle: true,
      yearValue: "Years"
    });
  };

  // ZA FILTER PO GODINA VO GODINI //
  // onChange //
  selectYValue = e => {
    console.log("YEAR VALUE IS SELECTED");
    let that = this;
    this.setState(
      {
        yearValue: e.target.value
      },
      () => {
        console.log("SortProductsBy CB");
        that.filterByYear();
      }
    );
    console.log(e.target.value);
  };

  filterByYear = () => {
    let onlyYear = this.state.yearValue;
    console.log("onlyYear at Years is SELECTED -", onlyYear);
    let fromYear = new Date(`${onlyYear}-01-01 00:00:00.000`).getTime();
    console.log("Choose Year - dateFrom", fromYear); //Mon Jan 01 2001 00:00:00 default//
    let toYear = new Date(`${onlyYear}-12-31 23:59:59.000`).getTime();
    console.log("Choose Year - dateToOO", toYear); //Mon Dec 31 2001 23:59:59 default//
    if (onlyYear === "Years") {
      this.getAllProductsInExp();
    } else if (
      this.state.toggle === true &&
      onlyYear !== "" &&
      onlyYear !== "Years"
    ) {
      this.setState({ loading: true });
      axios
        .get(
          `/api/v1/products/?purcdate_from=
          ${fromYear}&purcdate_to=${toYear}&sort=purchaseDate:desc`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
          }
        )
        .then(res => {
          console.log("In TIMEOUT");
          this.setState({ data: res.data, loading: false });
          console.log(this.res.data);
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err, "ERROR on Yarly at Expenses component");
        });
    }
  };

  showMonthlyBtn = (/*e*/) => {
    this.getAllProductsInExp();
    this.setState({
      toggle: false,
      yearValue: "Years",
      monthValue: "Months"
    });
  };

  // Za Mesec, Mesec i Godina//
  // onChange //
  selectMValue = (e, isMonth) => {
    console.log("MONTH VALUE IS SELECTED");
    let that = this;
    if (isMonth) {
      this.setState(
        {
          monthValue: e.target.value
        },
        () => {
          console.log("SortProductsBy CB");
          that.filterByMonthAndYear();
        }
      );
      console.log(e.target.value);
    } else {
      this.setState(
        {
          yearValue: e.target.value
        },
        () => {
          console.log("SortProductsBy CB");
          // console.log(event.target.id, event.target.value);
          that.filterByMonthAndYear();
        }
      );
    }
    console.log(e.target.value);
  };

  yearToYear = () => {
    let selectedYear = Number(this.state.yearValue);
    let OnlyfromYear = new Date(`${selectedYear}-01-01 00:00:00.000`).getTime();
    let OnlytoYear = new Date(`${selectedYear}-12-31 23:59:59.000`).getTime();
    this.setState({ loading: true });
    axios
      .get(
        `/api/v1/products/?purcdate_from=
      ${OnlyfromYear}&purcdate_to=${OnlytoYear}&sort=purchaseDate:desc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      )
      .then(res => {
        console.log("In TIMEOUT");
        this.setState({ data: res.data, loading: false });
        console.log(this.res.data);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err, "ERROR on Yarly at Expenses component");
      });
  };

  filterByMonthAndYear = () => {
    let selectedMonth = Number(this.state.monthValue);
    // console.log("SelectedMonth at Months is SELECTED -", selectedMonth);
    // console.log("SelectedMonth + 1 at Months-", selectedMonth + 1);

    let selectedYear = Number(this.state.yearValue);
    // console.log("SelectedYear at Months", selectedYear);

    let decCurrY = new Date(`${selectedYear}-12-01 00:00:00.000`).getTime();
    console.log("decCurrY", decCurrY);
    let janNextY = new Date(`${selectedYear + 1}-01-01 00:00:00.000`).getTime();
    console.log(janNextY);

    if (selectedMonth === 12) {
      this.setState({ loading: true });
      console.log("Getting data");
      axios
        .get(
          `/api/v1/products/?purcdate_from=
          ${decCurrY}&purcdate_to=${janNextY}&sort=purchaseDate:desc`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
          }
        )
        .then(res => {
          this.setState({ data: res.data, loading: false });
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err, "ERROR at Expenses component");
        });
    }
    // else {
    //   console.log("Seleceted Month is not December");
    // }

    let dateFromYM = new Date(
      `${selectedYear}-${selectedMonth} 00:00:00.000`
    ).getTime();
    console.log("dateFromYM", dateFromYM); // Sat Jan 01 2000 00:00:00?//
    let dateToYM = new Date(
      `${selectedYear}-${selectedMonth + 1} 00:00:00.000`
    ).getTime();
    console.log("dateToYM", dateToYM); //Mon Jan 01 2001 00:00:00//

    if (
      /*selectedMonth === 0 && this.state.yearValue === "Years"*/
      selectedMonth === 0 &&
      this.state.yearValue !== "Years"
    ) {
      // console.log(selectedMonth, " 0 index of month is selected");
      this.setState({ monthValue: "Months" }, () => {
        // console.log(this.state.monthValue);
        this.yearToYear();
      });
    }
    if (
      selectedMonth !== 0 &&
      this.state.monthValue !== "Months" &&
      this.state.yearValue === "Years"
    ) {
      // <ReactTooltip place="right" type="warning" effect="solid">
      //   <p>"Please select year too, to complete the request"</p>
      // </ReactTooltip>;
      alert("Please select year too, to complete the request");
      this.getAllProductsInExp();
    } else if (this.state.yearValue === "Years") {
      this.getAllProductsInExp();
    } else if (
      this.state.toggle === false &&
      this.state.monthValue !== 0 &&
      this.state.monthValue !== "Months" &&
      // this.state.yearValue !== 0 &&
      this.state.yearValue !== "Years"
    ) {
      this.setState({ loading: true });
      axios
        .get(
          `/api/v1/products/?purcdate_from=
          ${dateFromYM}&purcdate_to=${dateToYM}&sort=purchaseDate:desc`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
          }
        )
        .then(res => {
          this.setState({ data: res.data, loading: false });
          console.log(this.state.data);
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err, "ERROR at Expenses component");
        });
    } else if (
      this.state.toggle === false &&
      this.state.yearValue !== "Years" &&
      this.state.monthValue === "Months"
    ) {
      this.yearToYear();
    }
  };

  render() {
    console.log(this.state.monthValue);
    console.log(this.state.yearValue);
    // Za options na selectbox od Year
    // console.log("Loading: ", this.state.loading);
    let today = new Date();
    // console.log(today);
    let year = today.getFullYear();
    // console.log(year);
    // let month = today.getMonth();
    // console.log(month);
    let selYears = [];
    for (let i = 1998; i <= year; i++) {
      selYears.push(i);
    }
    selYears.reverse();
    // console.log(selYears);
    selYears.unshift("Years");

    const userData = this.state.unidata;
    const userYears = [];
    if (userData.length > 0) {
      for (let g = 0; g < userData.length; g++) {
        userYears.push(userData[g].purchaseDate.slice(0, 4));
        // userYears.unshift("Years");
      }
    } else {
      console.log("Loading... ");
    }
    const uniqueUserYears = [...new Set(userYears)];
    // console.log(uniqueUserYears);

    // Za options na selectbox od Month
    let monthsList = [
      "Months",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let totalSpent = 0;
    for (let i = 0; i < this.state.data.length; i++) {
      totalSpent += this.state.data[i].productPrice;
    }

    const NavbarSur = this.props.component;
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <NavbarSur toggle={true} />
        <div id="expenses">
          <div className="exmain-container">
            <div id="emaintitle">
              <h1>Expenses</h1>
            </div>
            <div id="experiod">
              <div className="ex-period-btns">
                <button
                  type="button"
                  className={
                    !this.state.toggle ? "mY-btn active-mY-btn" : "mY-btn"
                  }
                  onClick={this.showMonthlyBtn}
                >
                  MONTHLY
                </button>
                <button
                  type="button"
                  className={
                    this.state.toggle ? "mY-btn active-mY-btn" : "mY-btn"
                  }
                  onClick={this.showYearlyBtn}
                >
                  YEARLY
                </button>
              </div>
              {this.state.toggle ? (
                <div id="Yearly-cont">
                  {/* <p id="years"> */}
                  <label>Choose Year</label>
                  <select
                    /*name="expenses-filter"*/
                    id="mySelectYears"
                    className="ex-select-year"
                    onChange={this.selectYValue}
                    value={this.state.yearValue}
                  >
                    <option value="Years">Years</option>
                    {uniqueUserYears.map((year, i) => (
                      // console.log("In Select", i, year),
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {/* </p> */}
                </div>
              ) : (
                <div id="Monthly-cont">
                  {/* <p id="years"> */}
                  {/* <h2>Choose Month</h2> */}
                  <div id="ch-month">
                    <label>Choose Month</label>
                    <select
                      /*name="expenses-filter" */
                      id="mySelectMonths"
                      className="ex-select"
                      onChange={e => this.selectMValue(e, true)}
                      value={this.state.monthValue}
                    >
                      {monthsList.map((month, i) => (
                        // console.log(i, month),
                        <option key={month} value={i}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <h2>Choose Year</h2> */}
                  <div id="ch-year">
                    <label>Choose Year</label>
                    <select
                      /*name="expenses-filter" */
                      id="mySelectYears"
                      className="ex-select"
                      onChange={e => this.selectMValue(e, false)}
                      value={this.state.yearValue}
                    >
                      <option value="Years">Years</option>
                      {uniqueUserYears.map((year, i) => (
                        // console.log(i, year),
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* </p> */}
                </div>
              )}
            </div>
            <TableAll
              dataLoading={this.state.loading}
              data={this.state.data}
              mesec={Number(this.state.monthValue)}
              godina={this.state.yearValue}
            />
          </div>
          <div id="saldo">
            <h2>
              <span id="wh">Total spent:</span> {totalSpent} den.
            </h2>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Expenses;

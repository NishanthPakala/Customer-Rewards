import React from "react";
// import React, { useState } from "react";
import "./App.css";
import CustomizedTables from "./TransactionHistory";
import data from "./data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.findTransactions = this.findTransactions.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.last3MonthsTransactions = this.last3MonthsTransactions.bind(this);
    this.state = {
      showResults: false,
      searchString: "",
      error: false,
    };
  }

  calculatePoints(r) {
    // let points = 0;

    r.forEach((element) => {
      element.meta.points = 0;
      if (element.meta.cost >= 50 && element.meta.cost <= 100) {
        element.meta.points = element.meta.cost - 50;
      } else if (element.meta.cost > 100) {
        element.meta.points = 2 * (element.meta.cost - 100) + 50;
      }
    });

    return r;
  }

  last3MonthsTransactions(r) {
    const dataWithPoints = this.calculatePoints(r);
    var targetDate = new Date();
    // console.log(targetDate.toLocaleDateString());
    targetDate.setMonth(targetDate.getMonth() - 3);
    // console.log(targetDate.toLocaleDateString());
    const transactionsIn90Days = dataWithPoints.filter((trans) => {
      const _date = new Date(trans.meta.date);
      return _date.getTime() > targetDate.getTime();
    });

    console.log(transactionsIn90Days);
    return transactionsIn90Days.sort(
      (a, b) => new Date(b.meta.date) - new Date(a.meta.date)
    );
  }

  findTransactions() {
    const { searchString } = this.state;
    const results = data.transactions.filter(function (person) {
      return (
        person.meta.name.toLocaleLowerCase() ===
        searchString.toLocaleLowerCase()
      );
    });

    if (results.length > 0) {
      // const _results = this.calculatePoints(results);
      const _results = this.last3MonthsTransactions(results);
      this.setState({ filteredResults: _results, error: false });
    } else {
      this.setState({ filteredResults: [], error: true });
    }
  }

  // const calculateRewards = () => {}
  render() {
    const { searchString, error, filteredResults } = this.state;
    return (
      <div className="App">
        <header className="App-header">Customer Rewards</header>
        <div className="Input-box">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={searchString}
              onChange={(e) => this.setState({ searchString: e.target.value })}
            />
            <button onClick={this.findTransactions}>Submit</button>
          </label>
        </div>
        {error ? (
          <p> {"results not found"} </p>
        ) : (
          <CustomizedTables data={filteredResults}></CustomizedTables>
        )}
      </div>
    );
  }
}

export default App;

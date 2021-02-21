import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callApi() {
    fetch("http://localhost:9000/testapi")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <div className="App">
        <p className="api-test">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;

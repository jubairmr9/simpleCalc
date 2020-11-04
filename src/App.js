import React, { Component } from "react";
import "./App.css";
import ResultComponent from "./ResultComponent";
import KeyPadComponent from "./KeyPadComponent";
import LogComponent from "./LogComponent";
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: "result",
      a : "",
      b : "",
      operator : ""
    }
  }

  onClick = (button, name) => {
    if(name === "var") {
      if (this.state.operator === "") {
        // check if this is the first digit entry of A
        if(this.state.a == "") {
          // if this was the first digit entry of A
          this.setState({ a: button, result : button });
        } else {
          // concatenate the new digit to the previous value of A
          var previousValueOfA = this.state.a;
          var newValueOfA = `${previousValueOfA}${button}`;
          this.setState({ a: newValueOfA, result: newValueOfA});
        }
      }
      // if the operator is no longer empty means we are ready to move to B
      else {
        // set this to be the first digit entry of B
        this.setState({ b : button, result : button})
        // conatenate the new digit to the previous value of B
        var previousValueOfB = this.state.b;
        var newValueOfB = `${previousValueOfB}${button}`;
        this.setState({ b: newValueOfB, result: newValueOfB});
        }
      }
      else if(name ==="op") {
        this.setState({ operator: button,  result : button });
      }
      else if(name ==="other") {
        this.reset();
      }
      else if (name ==="calc") {
        this.calculate();
      }
  };

  calculate = async () => {
    const { a, b, operator } = this.state;
    try {
        const payload = await axios.post("https://950kdmlt62.execute-api.us-east-1.amazonaws.com/DEV/", { a, b, operator });
        const { data = {} } = payload ;
        this.setState({
          result : data,
          a : "",
          b : "",
          operator : "" })
        } catch (err) {
          this.setState({ result: "error" });
        }
      };

  getLogsFromDynamo = async () => {
    try {
      var result = await axios.get("https://m9505aqanh.execute-api.us-east-1.amazonaws.com/DEV");
      // get logs and then set it to state
      const { data = {} } = result;
      const { Items = [] } = data;
      this.setState({ logs: Items });
    } catch (e) {
      this.setState({ logs: ["Cannot show logs during this time"] });
    }
  }

  reset = () => {
    this.setState({
      result: "",
      a: "",
      b: "",
      operator: ""
    });
  };

  componentDidMount() {
    // call to get logs from dynamo as soon as app starts
    this.getLogsFromDynamo();
    //  call the api with every two seconds
    this.timePassed = setInterval(() => this.getLogsFromDynamo(), 1000)
  }

  componentWillUnmount() {
    // When moved to other app or different view in app no longer keep track of the time interval to make api call
    clearInterval(this.timePassed);
  }

  render() {
    const { logs = [] } = this.state;
    return (
      <div>
        <div className="calculator-body">
          <h1>Simple Calculator</h1>
          <ResultComponent result={this.state.result} />
          <KeyPadComponent onClick={this.onClick} />
          {logs.map((log,index) => {
            const logMessage = `${log.response}`
            return (
              <LogComponent log={logMessage} key={index} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
// JavaScript source code

import React from "react";
import Pet from "./views/Pet/Pet.js";
import LogIn from "./views/LogIn/LogIn.js";
import SignUp from "./views/LogIn/SignUp.js";
import Create from "./views/Create.js";
import Pets from "./views/Pets.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "nes.css/css/nes.min.css";
import "./App.css";
import { Router, useParams } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/create" component={Create} />

          {/* the below is meant to be /pet/:id not pets/:id */}
          <Route path="/pets/:id" component={Pet} />
          {/* but changing it makes the create new pet button go to the pets page??? */}
          {/* <Route path="/pet/:id" component={Pet} /> */}

          <Route path="/pets" component={Pets} />

          <Route path="/signup" component={SignUp} />

          <Route path="/" component={LogIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;

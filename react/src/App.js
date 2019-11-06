import React from "react";
import Pet from "./views/Pet/Pet.js";
import LogIn from "./views/LogIn.js";
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

  componentDidMount = () => { };

  render() {
    return (
      <BrowserRouter>
        <Switch>


          <Route path="/create">
            <Create />
          </Route>
          <Route path="/pets/:id" component={Pet} />
          <Route path="/pets" component={Pets} />


          <Route path="/" component={LogIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;

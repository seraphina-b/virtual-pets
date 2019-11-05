import React from "react";
import Pet from "./views/Pet/Pet.js";
import LogIn from "./views/LogIn.js";
import Create from "./views/Create.js";
import Pets from "./views/Pets.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "nes.css/css/nes.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => { };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <LogIn />
          </Route>

          <Route path="/create">
            <Create />
          </Route>

          <Route path="/pets">
            <Pets />
          </Route>


          <Route path="/pet/:id" component={Pet} />




        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;

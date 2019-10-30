import React from "react";
import Header from "./views/Pet/Header.js";
import Footer from "./views/Pet/Footer.js";
import LogIn from "./views/LogIn.js";
import eggStage from "./images/lifeStages/eggStage.png";
import { BrowserRouter, Route } from "react-router-dom";
import "nes.css/css/nes.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header></Header>
          <h1>Virtual Pet</h1>
          <button type="button" className="nes-btn is-primary">Create New Pet</button>
          <img src={eggStage} alt="Egg tamagotchi"></img>
          <Footer></Footer>
          <Route path="/LogIn" component={LogIn} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;

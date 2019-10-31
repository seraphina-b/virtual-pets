import React from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js";
import eggStage from "../.././images/lifeStages/eggStage.png";


class Pet extends React.Component {
    constructor(props) {
        super(props);
        this.state ={};
    }

    render() {
        return (
        <body>
          <progress className="nes-progress is-success" max="10" value="7"/> 
          <h1>Virtual Pet</h1>
          <Header></Header>
    {/* <button type="button" className="nes-btn is-primary">Create New Pet</button> */}
          <img src={eggStage} alt="Egg tamagotchi"></img>
          <Footer></Footer>
          </body>
        )
    }
}
 export default Pet;
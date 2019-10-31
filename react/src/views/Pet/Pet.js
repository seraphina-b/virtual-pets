import React from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js";
import eggStage from "../.././images/lifeStages/eggStage.png";
import baby from "../.././images/lifeStages/baby.png";

class Pet extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            satiety: 11
        };
    }

    componentDidMount = () => {
        
    }

    render() {
        return (
        <body>
          <h3>Hunger</h3>
          <progress className="nes-progress is-success" max="15" value={this.state.satiety}/> 
          <h1>Virtual Pet</h1>
          <Header></Header>
          <br></br>
          <section className="nes-container with-title"> 
            <h3 className="title">Your Pet</h3>
            <i className="nes-icon heart is-large"></i>
            <i className="nes-icon heart is-large"></i>
            <i className="nes-icon heart is-large"></i> 
            <img src={eggStage} alt="Egg tamagotchi"></img>
          </section>
          
          
          </body>
        )
    }
}
 export default Pet;
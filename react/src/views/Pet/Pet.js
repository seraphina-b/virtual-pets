import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import eggStage from "../.././images/lifeStages/eggStage.png";
import baby from "../.././images/lifeStages/baby.png";

class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      satiety: 0
    };
  }

  componentDidMount = () => {};
  //just writing a note so i'll understand
  // i tag is an icon tag. didn't know that before
  // render() {
  //   return (
  //     <body>
  //       <h3>Hunger</h3>
  //       <progress className="nes-progress is-success" max="15" value={this.state.satiety} />
  //       <h1>Virtual Pet</h1>
  //       <Header></Header>

  //   this.updateSatiety();
  // };

  updateSatiety = () => {
    fetch("/pets/1")
      .then(res => res.json())
      .then(data => {
        this.setState({
          satiety: data[0].satiety
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFeeding = () => {
    fetch(`/pets/1/events`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          satiety: data
        });
      })
      .then(this.updateSatiety())
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.satiety);
  };

  render() {
    let howFull = "nes-progress";
    if (this.state.satiety < 6) howFull += " is-error";
    else if (this.state.satiety < 11) howFull += " is-warning";
    else howFull += " is-success";
    return (
      <body>
        <h3>Hunger</h3>
        <progress className={howFull} max="15" value={this.state.satiety} />
        <h1>Virtual Pet</h1>
        <Header handleFoodClick={this.handleFeeding}></Header>

        <br></br>
        <section className="nes-container with-title">
          <h3 className="title">Your Pet</h3>
          <i className="nes-icon heart is-large"></i>
          <i className="nes-icon heart is-large"></i>
          <i className="nes-icon heart is-large"></i>

          <img src={baby} alt="Egg tamagotchi"></img>
        </section>
      </body>
    );
  }
}
export default Pet;

import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import egg from "../.././images/lifeStages/egg.png";
import eggStage from "../.././images/lifeStages/eggStage.png";
import baby from "../.././images/lifeStages/baby.png";
//because we're going to use these for animation
import child from "../.././images/lifeStages/child.png";

import teen from "../.././images/lifeStages/teen.png";
import adult from "../.././images/lifeStages/adult.png";

import { Router, useParams } from "react-router-dom";
// let { id } = useParams();

class Pet extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match);
    this.state = {
      pet: {}
    };
  }

  componentDidMount = () => {
    let id = this.props.match.params.id;

    fetch(`/pets/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateSatiety = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}`)
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
    //sorry wouldn't this have a template literal?
    let id = this.props.match.params.id;
    fetch(`/pets/${id}/events`, {
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


  // let timeArray = this.state.age.split(":");
  // console.log(timeArray);

  render() {
    let howFull = "nes-progress";
    if (this.state.pet.satiety < 6) howFull += " is-error";
    else if (this.state.pet.satiety < 11) howFull += " is-warning";
    else howFull += " is-success";

    //i want to seperate the "age" in hours, minutes, and seconds in an arrayand convert them from strings into numbers. then say
    // if(hours<0&&minutes<=2){src=egg} and shit like that. I think the way to do this is in my astrology app
    //i also want to use this seperation to display the age more cleanly
    return (
      <div>
        <h1>Pet Name:</h1>
        <h2>{this.state.pet.name}</h2>
        <h3>Age</h3>
        <h4>{this.state.pet.age}</h4>
        <h3>Hunger</h3>
        <progress className={howFull} max="15" value={this.state.pet.satiety} />
        <h1>Virtual Pet</h1>
        <Header handleFoodClick={this.handleFeeding}></Header>

        <br></br>
        <section className="nes-container with-title">
          <h3 className="title">Your Pet</h3>
          <i className="nes-icon heart is-large"></i>
          <i className="nes-icon heart is-large"></i>
          <i className="nes-icon heart is-large"></i>

          {/* <progress max="15" value={this.state.age} /> */}
          {/* { this.state.pet.age==="00:00:02"? */}
          <img src={baby} alt="Egg tamagotchi"></img>
        //}
        </section>
      </div>
    );
  }
}
export default Pet;

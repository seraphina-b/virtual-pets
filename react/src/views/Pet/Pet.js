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
import bread from "../.././images/bread.png";
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

  //handleAge just for testing right now
  handleAge = (e) => {
    e.preventDefault();
    let timeArray = this.state.pet.age.split(":");
    console.log(timeArray);
    let hours = parseInt(timeArray[0], 10);
    let minutes = parseInt(timeArray[1]);
    let seconds = parseInt(timeArray[2]);
    console.log("It's " + hours + " hours");
    console.log(minutes + " minutes");
    console.log(seconds + " seconds");
  }


  render() {
    let howFull = "nes-progress";
    if (this.state.pet.satiety < 6) howFull += " is-error";
    else if (this.state.pet.satiety < 11) howFull += " is-warning";
    else howFull += " is-success";
    //does not work here for some reason
    // let timeArray = this.state.pet.age.split(":");
    // console.log(timeArray);
    // let hours = parseInt(timeArray[0], 10);
    // let minutes = parseInt(timeArray[1]);
    // let seconds = parseInt(timeArray[2]);
    // console.log("It's " + hours + " hours");
    // console.log(minutes + " minutes");
    // console.log(seconds + " seconds");
    //i want to seperate the "age" in hours, minutes, and seconds in an arrayand convert them from strings into numbers. then say
    // if(hours<0&&minutes<=2){src=egg} and shit like that. I think the way to do this is in my astrology app
    //i also want to use this seperation to display the age more cleanly
    //i don't want the button
    return (
      <div className="container">
        {/* Need to re organise the naming I think - header? nav bar? and footer at the bottom */}
        <section className="nes-container with-title">
          <div className="row">
            <div className="col">
              <h1>Virtual Pet</h1>
            </div>
            <div className="col">
              <button type="button" className="nes-btn is-primary">
                My Pets
              </button>
              <button type="button" className="nes-btn is-primary">
                Log Out
              </button>
            </div>
          </div>
        </section>

        <br></br>

        <div class="row">
          <div class="col">
            <h2>{this.state.pet.name}</h2>
            <h3>Age</h3>
            <h4>{this.state.pet.age}</h4>
            <img src={egg} alt="Egg tamagotchi"></img>
          </div>

          <div class="col">
            {/* <progress className={howFull} max="15" value={this.state.pet.satiety} />
        <Header handleFoodClick={this.handleFeeding}></Header> */}
            <h5>Hunger</h5>
            <progress class="nes-progress" value="90" max="100"></progress>
            <h5>Cleanliness</h5>
            <progress
              class="nes-progress is-primary"
              value="80"
              max="100"
            ></progress>
            <h5>Playfulness</h5>
            <progress
              class="nes-progress is-success"
              value="50"
              max="100"
            ></progress>
            <h5>Attention</h5>
            <progress
              class="nes-progress is-warning"
              value="30"
              max="100"
            ></progress>
            <h5></h5>
            <progress
              class="nes-progress is-error"
              value="10"
              max="100"
            ></progress>

            <h5>Health</h5>
            <i className="nes-icon heart is-large"></i>
            <i className="nes-icon heart is-large"></i>
            <i className="nes-icon heart is-large"></i>
            {/* <progress max="15" value={this.state.age} /> */}
            {/* { this.state.pet.age==="00:00:02"? */}
          </div>
        </div>

        {/* added a <br> for a bit of spacing between the sections - but not sure if this is best practice */}
        <br></br>
        <section className="nes-container with-title">

          <h3 className="title">Actions</h3>
          <button onClick={this.props.handleFoodClick} className="nes-btn">
            {" "}
            <img src={bread} alt="Bread icon" />
          </button>

          <h3 className="title">Your Pet</h3>
          <i className="nes-icon heart is-large"></i>
          <i className="nes-icon heart is-large"></i>
          <i className="nes-icon heart is-large"></i>

          {/* <progress max="15" value={this.state.age} /> */}
          {/* { this.state.pet.age==="00:00:02"? */}

          <img src={baby} alt="Egg tamagotchi"></img>
          <button className="button" onClick={e => this.handleAge(e)}>Show Growth Stage</button>
          <h1>{hours}</h1>


        </section>

        <br></br>
        <section className="nes-container with-title"></section>
      </div>
    );
  }
}
export default Pet;

import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Router, useParams, Link } from "react-router-dom";
import Pusher from "pusher-js";

// life stage images
import egg from "../.././images/lifeStages/egg.png";
import baby from "../.././images/lifeStages/baby.png";
import child from "../.././images/lifeStages/child.png";
import teen from "../.././images/lifeStages/teen.png";
import adult from "../.././images/lifeStages/adult.png";

// pet alert images
import help from "../.././images/petAlerts/help.png";

// action button images
import bread from "../.././images/bread.png";
import happy from "../.././images/happy.png";
import clean from "../.././images/clean.png";
import play from "../.././images/ball.png";

class Pet extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match);
    this.state = {
      pet: {}
    };
  }

  // function to connect to pusher
  connectToPusher = () => {
    var pusher = new Pusher("a6e425669a496f8c754a", {
      cluster: "eu",
      forceTLS: true
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", data => {
      console.log(data);
      this.getData();
    });
  };

  componentDidMount = () => {
    this.connectToPusher();
    this.getData();
  };

  // getData captures the pet data and displays it on the screen
  // this basically refreshed the page and updates the pet info
  getData = () => {
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

  // updates the pets hunger levels and used with hunger button
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

  updateHappy = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          happy: data[0].happy
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  makeHappy = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}/events`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data[0].happy
        });
      })
      //.then(this.updateSatiety())
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.pet.happy);
  };

  handleFeeding = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}/events`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data
        });
      })
      //.then(this.updateSatiety())
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.satiety);
  };

  // let timeArray = this.state.age.split(":");
  // console.log(timeArray);

  //handleAge just for testing right now
  handleAge = e => {
    e.preventDefault();
    let timeArray = this.state.pet.age.split(":");
    console.log(timeArray);
    let hours = parseInt(timeArray[0], 10);
    let minutes = parseInt(timeArray[1]);
    let seconds = parseInt(timeArray[2]);
    console.log("It's " + hours + " hours");
    console.log(minutes + " minutes");
    console.log(seconds + " seconds");
  };

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
    let lifeStagePic;
    if (this.state.pet.age <= "00:00:30") {
      lifeStagePic = <img src={egg} alt="Egg tamagotchi"></img>;
    } else if (
      this.state.pet.age > "00:00:30" &&
      this.state.pet.age <= "00:01:00"
    ) {
      lifeStagePic = <img src={baby} alt="baby tamagotchi"></img>;
    } else if (
      this.state.pet.age > "00:01:00" &&
      this.state.pet.age <= "00:01:30"
    ) {
      lifeStagePic = <img src={child} alt="child tamagotchi"></img>;
    } else if (
      this.state.pet.age > "00:01:30" &&
      this.state.pet.age <= "00:02:00"
    ) {
      lifeStagePic = <img src={teen} alt="teen tamagotchi"></img>;
    } else if (this.state.pet.age > "00:02:00") {
      lifeStagePic = <img src={adult} alt="adult tamagotchi"></img>;
    }

    return (
      <div className="container">
        <nav className="nes-container with-title">
          <div className="row">
            <div className="col">
              <h1>Virtual Pet</h1>
            </div>
            <div className="col">
              {/* Kat note: a button that directs users to Pets.js (list) */}
              <Link to="/pets" className="nes-btn is-primary">
                My Pets
              </Link>
              <button type="button" className="nes-btn is-primary">
                Log Out
              </button>
            </div>
          </div>
        </nav>

        <br></br>
        <section className="nes-container with-title">
          <h3 className="title">Your Pet</h3>

          <div className="row">
            <div className="col">
              {/* Kat note: h2 displays the pet name */}
              <h2>{this.state.pet.name}</h2>
              {/* Kat note: what do we want these hearts to do? */}
              <i className="nes-icon heart is-large"></i>
              <i className="nes-icon heart is-large"></i>
              <i className="nes-icon heart is-large"></i>

              <h3>Age</h3>
              {/* Kat note: do we want to display age? */}
              <h4>{this.state.pet.age}</h4>
              {lifeStagePic}

              {/* Kat note: thumbnail for pet alerts */}
              <button className="nes-btn">
                <img src={help} alt="Pet needs help" />
              </button>
            </div>

            <div className="col">
              {/* Hunger bar | min = 0 max = 15 | reduces by 2 every 5 mins | if hunger = 0 or > 25 - pet dies | if hunger = 20 - pet sick */}
              <h5>Hunger</h5>
              <progress
                className="nes-progress is-success"
                value={this.state.pet.satiety}
                max="15"
              ></progress>
              {/* Happiness bar | min = 0 max = 15 */}
              <h5>Happiness</h5>
              <progress
                class="nes-progress is-warning"
                value={this.state.pet.happy}
                max="15"
              ></progress>
              {/* Cleanliness bar | min = 0 max = 15 */}
              <h5>Cleanliness</h5>
              <progress
                class="nes-progress is-primary"
                value="2"
                max="15"
              ></progress>
              {/* Playfulness bar | min = 0 max = 15 */}
              <h5>Playfulness</h5>
              <progress
                class="nes-progress is-error"
                value="2"
                max="15"
              ></progress>

              <h3 className="title">Actions</h3>
              {/* feed button */}
              {this.state.pet.age > "00:00:00" && (
                <button onClick={this.handleFeeding} className="nes-btn">
                  {" "}
                  <img src={bread} alt="Bread icon" />
                </button>
              )}
              {/* happy button */}
              {this.state.pet.age > "00:00:00" && (
                <button onClick={this.makeHappy} className="nes-btn">
                  {" "}
                  <img src={happy} alt="Happy icon" />
                </button>
              )}
              {/* clean button */}
              {this.state.pet.age > "00:00:00" && (
                <button onClick={this.handleFeeding} className="nes-btn">
                  {" "}
                  <img src={clean} alt="Bath icon" />
                </button>
              )}
              {/* play button */}
              {this.state.pet.age > "00:00:00" && (
                <button onClick={this.handleFeeding} className="nes-btn">
                  {" "}
                  <img src={play} alt="Tennis ball icon" />
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Pet;

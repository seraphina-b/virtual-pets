import React from "react";
import Pusher from "pusher-js";
import { Router, useParams, Link } from "react-router-dom";

// life stage images
import born from "../.././images/lifeStages/born.png";
import baby from "../.././images/lifeStages/baby.png";
import child from "../.././images/lifeStages/child.png";
import teen from "../.././images/lifeStages/teen.png";
import adult from "../.././images/lifeStages/adult.png";

// pet alert image
import help from "../.././images/petAlerts/help.png";

// pet poops component & image
import Poop from "./Poop.js";
import poop from "../.././images/petAlerts/poop.png";

// action button images
import bread from "../.././images/bread.png";
import happy from "../.././images/happy.png";
import bath from "../.././images/bath.png";
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
  // this is a cron job controlled in petBars and sendNotifications
  connectToPusher = () => {
    var pusher = new Pusher("a6e425669a496f8c754a", {
      cluster: "eu",
      forceTLS: true
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("updatePet", data => {
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
    fetch(`/pets/${id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data
        });
      })
      .then((data) => {
        console.log(this.state.pet)
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFeeding = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}/satiety`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.pet.satiety);
  };

  handleHappy = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}/happy`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.pet.happy);
  };

  handleCleaning = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}/clean`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.pet.clean);
  };
  // let timeArray = this.state.age.split(":");
  // console.log(timeArray);

  handlePlaying = () => {
    let id = this.props.match.params.id;
    fetch(`/pets/${id}/play`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pet: data
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.pet.play);
  };

  render() {
    // making the pet 'grow' - changing the lifeStage images depending on time
    let lifeStagePic;
    if (this.state.pet.age <= 1800) {
      lifeStagePic = <img src={born} alt="born tamagotchi"></img>;
    } else if (
      this.state.pet.age > 1800 &&
      this.state.pet.age <= 12600
    ) {
      lifeStagePic = <img src={baby} alt="baby tamagotchi"></img>;
    } else if (
      this.state.pet.age > 12600 &&
      this.state.pet.age <= 172800
    ) {
      lifeStagePic = <img src={child} alt="child tamagotchi"></img>;
    } else if (
      this.state.pet.age > 172800 &&
      this.state.pet.age <= 345600
    ) {
      lifeStagePic = <img src={teen} alt="teen tamagotchi"></img>;
    } else if (this.state.pet.age > 345600) {
      lifeStagePic = <img src={adult} alt="adult tamagotchi"></img>;
    }

    //makes poop appear but also lets us clean the poop
    //might be a better way to do this on the frontend AND the backend this is what I have for now
    //adding comment because git is acting weird

    let poopPic;
    if (this.state.pet.foodTime >= 30 && this.state.pet.clean <= 13) {
      console.log("poop should be there");
      poopPic = <img src={poop} alt="poop"></img>;
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
              <div className="row">
              {/* Kat note: h2 displays the pet name */}
              <h2>{this.state.pet.name}</h2>
              {/* Kat note: what do we want these hearts to do? */}
              <i className="nes-icon heart is-medium"></i>
              <i className="nes-icon heart is-medium"></i>
              <i className="nes-icon heart is-medium"></i>
              </div>
              {lifeStagePic}

              {/* Not sure if we will have time to make the alert image to work, so will commet in out for now */}
              {/* Kat note: thumbnail for pet alerts */}
              {/* <button className="nes-btn">
                <img src={help} alt="Pet needs help" />
              </button> */}

              {/* displays the poop image */}
              {poopPic}
            </div>

            <div className="col">
              {/* Hunger bar | min = 0 max = 15 | reduces by 2 every 5 mins | if hunger = 0 or > 25 - pet dies | if hunger = 20 - pet sick */}
              <h5>Hunger</h5> 
              <progress
                className={"nes-progress " + (
                  this.state.pet.satiety > 10 ? "is-success" : 
                  this.state.pet.satiety <= 10 && this.state.pet.satiety > 5 ? "is-warning" : 
                  "is-error")}
                value={this.state.pet.satiety}
                max="15"
              ></progress>
              {/* Happiness bar | min = 0 max = 15 */}
              <h5>Happiness</h5>
              <progress
                className={"nes-progress " + (
                  this.state.pet.happy > 10 ? "is-success" : 
                  this.state.pet.happy <= 10 && this.state.pet.happy > 5 ? "is-warning" : 
                  "is-error")}
                value={this.state.pet.happy}
                max="15"
              ></progress>
              {/* Cleanliness bar | min = 0 max = 15 */}
              <h5>Cleanliness</h5>
              <progress
                className={"nes-progress " + (
                  this.state.pet.clean > 10 ? "is-success" : 
                  this.state.pet.clean <= 10 && this.state.pet.clean > 5 ? "is-warning" : 
                  "is-error")}
                value={this.state.pet.clean}
                max="15"
              ></progress>
              {/* Playfulness bar | min = 0 max = 15 */}
              <h5>Playfulness</h5>
              <progress
                className={"nes-progress " + (
                  this.state.pet.play > 10 ? "is-success" : 
                  this.state.pet.play <= 10 && this.state.pet.play > 5 ? "is-warning" : 
                  "is-error")}
                value={this.state.pet.play}
                max="15"
              ></progress>

              {/* ACTION buttons */}
              <h3 className="title">Actions</h3>
              {/* feed button */}
              {(
                <button onClick={this.handleFeeding} className="nes-btn">
                  {" "}
                  <img src={bread} alt="Bread icon" />
                </button>
              )}
              {/* happy button */}
              {(
                <button onClick={this.handleHappy} className="nes-btn">
                  {" "}
                  <img src={happy} alt="Happy icon" />
                </button>
              )}
              {/* clean button, should also get rid of poop when we need it */}
              {(
                <button onClick={this.handleCleaning} className="nes-btn">
                  {" "}
                  <img src={bath} alt="Bath icon" />
                </button>
              )}
              {/* play button */}
              {(
                <button onClick={this.handlePlaying} className="nes-btn">
                  {" "}
                  <img src={play} alt="Tennis ball icon" />
                </button>
              )}
              {(
                <button className="nes-btn">
                  <img src={require("../.././images/rocket.png")} alt="Rocket ship icon" />
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

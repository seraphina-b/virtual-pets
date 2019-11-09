//make sick a component
import React from "react";
import Pusher from "pusher-js";
import { Router, useParams, Link } from "react-router-dom";

//sick image
import sick from "../.././images/petAlerts/sick.png";

class Sick extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match);
    this.state = {
      pet: {}
    };
  }

  render() {
    // making the pet 'grow' - changing the lifeStage images depending on time
    let sickPic;
    if (this.state.pet.foodTime <= "00:0:30") {
      sickPic = <img src={sick} alt="sick image"></img>;
    }

    return <div className="container">{sickPic}</div>;
  }
}
export default Sick;

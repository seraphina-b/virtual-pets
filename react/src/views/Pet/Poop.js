//make poop a component
import React from "react";
import Pusher from "pusher-js";
import { Router, useParams, Link } from "react-router-dom";

//poop images
import poop from "../.././images/petAlerts/poop.png";

class Poop extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match);
    this.state = {
      pet: {}
    };
  }
  // componentDidMount = () => {
  //     fetch(`/pets/${id}`)
  //         .then(res => res.json())
  //         .then(data => {
  //             this.setState({
  //                 pets: data
  //             });
  //         })
  //         .catch(error => {
  //             console.log(error);
  //         });
  // };

  render() {
    // making the pet 'grow' - changing the lifeStage images depending on time
    let poopPic;
    if (this.state.pet.foodTime <= "00:0:30") {
      poopPic = <img src={poop} alt="poop"></img>;
    }

    return <div className="container">{poopPic}</div>;
  }
}
export default Poop;

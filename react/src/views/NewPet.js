import React from "react";
import { Router } from "react-router-dom";
import Pet from "./Pet/Pet.js";

class NewPet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount = () => {
    fetch(`/pets/`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pets: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  // handleClick = () => {
  //     this.setState(prevState => ({
  //         isNewPet: !prevState.isNewPet
  //     }));
  // }

  handleClick = () => {
    fetch("/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //we're not getting the id and this that's a problem
      body: JSON.stringify({ name: this.state.name })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Posted your pet, baby!");
        console.log("data is " + JSON.stringify(data));
        //redirect the user to the new pet page
        //well it's going to undefined right now
        // in a previous commit this line was..
        // this.props.history.push("/pet")
        this.props.history.push(`/pets/${data.petID}`);
        // this.props.location.pathname.push(`/pets/${data.petId}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <input className="nes-input" onChange={this.handleChange} />
        <button
          type="button"
          onClick={this.handleClick}
          className="nes-btn is-success"
          // to={`/pets/${data.insertID}`}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default NewPet;

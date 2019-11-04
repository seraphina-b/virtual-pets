import React from "react";
import { Router } from "react-router-dom";

class NewPet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

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
      body: JSON.stringify({ name: this.state.name })
    })
      .then(res => res.json())
      .then(json => {
        console.log("Posted your pet, baby!");
        //redirect the user to the new pet page
        this.props.history.push("/pet");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <body>
        <input className="nes-input" onChange={this.handleChange} />
        <button
          type="button"
          onClick={this.handleClick}
          className="nes-btn is-success"
        >
          Submit
        </button>
      </body>
    );
  }
}

export default NewPet;

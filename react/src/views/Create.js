import React from "react";
import { Link } from "react-router-dom";
//i think this is what we want the /pets to be in many ways
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

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

        <div className="nes-container with-title">
          <h3 className="title">Create new pet</h3>
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
      </div>
    );
  }
}

export default Create;

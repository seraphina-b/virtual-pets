import React from "react";
import NewPet from "./NewPet.js";
import { Link } from "react-router-dom";
//i think this is what we want the /pets to be in many ways
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewPet: false,
      age: []
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      isNewPet: !prevState.isNewPet
    }));
    console.log(this.state.isNewPet);
  };

  componentDidMount() {
    fetch("/:petID/age")
      .then(res => res.json())
      .then(data => {
        this.setState({
          age: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAge() {
    fetch("/:petID/age", {
      method: "GET"
    })
      // Continue fetch request here
      .then(res => res.json())
      .then(data => {
        this.setState({});
      })
      .catch(error => {
        console.log(error);
        alert("Error, baby. Try again");
      });
  }

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
          <button
            type="button"
            onClick={this.handleClick}
            className="nes-btn is-primary"
          >
            Create New Pet
          </button>
          {this.state.isNewPet ? <NewPet {...this.props} /> : null}
          <div>
            {this.state.age.map(age => {
              return { age };
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Create;

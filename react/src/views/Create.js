import React from "react";
import NewPet from "./NewPet.js";

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
      <div>
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
    );
  }
}

export default Create;

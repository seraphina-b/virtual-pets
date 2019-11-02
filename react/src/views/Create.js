import React from "react";
import NewPet from "./NewPet.js";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewPet: false,
      getAge: []
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
          getAge: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <body>
        <button
          type="button"
          onClick={this.handleClick}
          className="nes-btn is-primary"
        >
          Create New Pet
        </button>
        {this.state.isNewPet ? <NewPet /> : null}
        {/* Note: I'm trying to make it so that when the submit button is clicked it will display the age of the pet using the get request made in pets.js, but it ain't working. *shrugs* */}
        <div>
          {this.state.getAge.map(age => {
            return { age };
          })}
        </div>
      </body>
    );
  }
}

export default Create;

//Pets (plural) frontend page
//not to be confused with Pet (singluar)
import React from "react";
import Pet from "./Pet/Pet.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class Pets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
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

  //nicole note: sort of nervous because the number of put pages will increase with use creation
  //may need a map function to map through like in sheba's project
  //it doesn't know which id we're talking about yet, shows up too literally
  render() {
    //i need a function that grabs the text
    const names = this.state.pets.map(pet => (
      <div>
        <Link to={`/pets/${pet.petID}`}>{pet.name}</Link>
      </div>
    ));
    return (
      <div className="container">
        {/* Kat note: this is the nav bar - same on each page but the buttons change */}
        <nav className="nes-container with-title">
          <div className="row">
            <div className="col">
              <h1>Virtual Pet</h1>
            </div>

            <button type="button" className="nes-btn is-primary">
              Log Out
            </button>
          </div>
        </nav>

        <br></br>
        <section className="nes-container with-title">
          <h3 className="title">Your Pets</h3>
          <ul>
            <li>{names}</li>
          </ul>
        </section>
        <br></br>
        <section className="nes-container with-title">
          <h3 className="title">Want a new pet?</h3>
          <Link to="/create" className="nes-btn is-success">
            Create New Pet
          </Link>
        </section>
      </div>
    );
  }
}
export default Pets;
